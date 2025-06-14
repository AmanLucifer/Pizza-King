import Link from 'next/link';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-600">Pizza King</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/menu" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Menu
              </Link>
              <Link href="/offers" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Offers
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-gray-500 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link href="/auth/login" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
              <UserIcon className="h-5 w-5 mr-2" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 