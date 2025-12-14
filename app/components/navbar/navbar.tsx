import { useState } from 'react';
import { Menu, X, Briefcase, Users, MessageSquare, Bell } from 'lucide-react'; 
import ApplyOnceLogo from '~/../assets/apply-once.png';
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Jobs', icon: Briefcase, href: '/jobs' },
    { name: 'Network', icon: Users, href: '/network' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Notifications', icon: Bell, href: '/notifications' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- Logo/Brand Section --- */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold logo-container">
                <div>
                    <img className="h-16" src={ApplyOnceLogo} alt="Apply Once Logo" />
                </div>
                <div className="center">
                    <p className='apply-text'>Apply <span className='once-text'>Once</span></p>
                </div>
            </a>
          </div>

          {/* --- Desktop Navigation Links --- */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center group"
              >
                <item.icon className="w-5 h-5 mr-1 text-gray-400 group-hover:text-indigo-600" />
                {item.name}
              </a>
            ))}
          </div>
          
          {/* --- User/Avatar Section (Optional but modern) --- */}
          <div className="hidden md:block">
            <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img 
                    className="h-8 w-8 rounded-full" 
                    src="https://via.placeholder.com/150" 
                    alt="User Avatar" 
                />
            </button>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
        </div>
      </div>

      {/* --- Mobile Menu Panel --- */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-150 ease-in-out"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
          {/* Separator and Mobile User Item */}
          <hr className="my-2"/>
          <div className="flex items-center px-3 py-2">
            <img 
                className="h-8 w-8 rounded-full mr-3" 
                src="https://via.placeholder.com/150" 
                alt="User Avatar" 
            />
            <span className="font-medium text-gray-800">Jane Doe</span>
          </div>
          <a
            href="/profile"
            className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            View Profile
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;