"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    offer_price: 0,
    images: [],
    rating: 0,
    category: "",
    is_available: true,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log("ProductsAdmin component mounted");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      console.log("Products fetched successfully:", data);
      setProducts(data || []);
    } catch (err: any) {
      console.error("Error in fetchProducts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log("Selected files:", files);
      setImageFiles(files);
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        console.log("Uploading file:", filePath);
        const { error: uploadError, data } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        console.log("File uploaded successfully:", publicUrl);
        uploadedUrls.push(publicUrl);
      }
    } catch (err) {
      console.error("Error in uploadImages:", err);
      throw err;
    }

    return uploadedUrls;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Adding new product:", newProduct);
      // Upload images first
      const imageUrls = await uploadImages(imageFiles);
      console.log("Images uploaded:", imageUrls);
      
      const { error } = await supabase.from("products").insert([
        {
          ...newProduct,
          images: imageUrls,
        },
      ]);

      if (error) {
        console.error("Error adding product:", error);
        throw error;
      }

      console.log("Product added successfully");
      // Reset form and refresh products
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        offer_price: 0,
        images: [],
        rating: 0,
        category: "",
        is_available: true,
      });
      setImageFiles([]);
      setIsAddingProduct(false);
      fetchProducts();
    } catch (err: any) {
      console.error("Error in handleAddProduct:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      console.log("Deleting product:", id);
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting product:", error);
        throw error;
      }

      console.log("Product deleted successfully");
      fetchProducts();
    } catch (err: any) {
      console.error("Error in handleDeleteProduct:", err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Add New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isAddingProduct && (
        <form onSubmit={handleAddProduct} className="space-y-4 bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold">Add New Product</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Offer Price</label>
              <input
                type="number"
                value={newProduct.offer_price}
                onChange={(e) => setNewProduct({ ...newProduct, offer_price: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
            <input
              type="number"
              value={newProduct.rating}
              onChange={(e) => setNewProduct({ ...newProduct, rating: Number(e.target.value) })}
              className="w-full border rounded px-3 py-2"
              required
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images (2-3 images)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => setIsAddingProduct(false)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <div className="relative h-48 mb-4">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-bold">${product.price}</span>
                {product.offer_price && (
                  <span className="ml-2 text-red-600 line-through">
                    ${product.offer_price}
                  </span>
                )}
              </div>
              <div className="text-yellow-500">★ {product.rating}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{product.category}</span>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 