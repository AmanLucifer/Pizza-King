import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic tomato sauce, mozzarella, and basil',
      price: 12.99,
      image: '/images/pizza-margherita.jpg',
    },
    {
      id: 2,
      name: 'Cheese Burger',
      description: 'Juicy beef patty with melted cheese',
      price: 8.99,
      image: '/images/cheese-burger.jpg',
    },
    {
      id: 3,
      name: 'Chocolate Ice Cream',
      description: 'Rich and creamy chocolate ice cream',
      price: 4.99,
      image: '/images/chocolate-ice-cream.jpg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Delicious Food Delivered</h1>
          <p className="text-xl mb-8">Order your favorite meals from Pizza King</p>
          <Link
            href="/menu"
            className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${item.price}</span>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered hot and fresh within 30 minutes
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quality Food</h3>
              <p className="text-gray-600">
                Made with the finest ingredients and prepared with care
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Easy Ordering</h3>
              <p className="text-gray-600">
                Simple and secure online ordering system
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
