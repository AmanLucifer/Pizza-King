"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProductsAdmin from "./components/ProductsAdmin";

const ADMIN_EMAIL = "admin@pizzaking.com";

type Tab = "products" | "orders";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");

  useEffect(() => {
    // If not loading and not admin, redirect to login
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <div className="flex space-x-4 mb-8 justify-center">
          <button
            className={`px-4 py-2 rounded font-semibold ${tab === "products" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("products")}
          >
            Products
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${tab === "orders" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
        </div>
        {tab === "products" ? <ProductsAdmin /> : <div>Orders management coming soon...</div>}
      </div>
    </div>
  );
}

// Placeholder components for now
// function ProductsAdmin() {
//   return <div>Product management coming soon...</div>;
// }

function OrdersAdmin() {
  return <div>Order management coming soon...</div>;
}