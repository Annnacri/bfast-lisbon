import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import LanguageSwitcher from './LanguageSwitcher';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { t } = useTranslation();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/sobre' },
    { name: t('nav.contact'), path: '/contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/60 backdrop-blur-xl border-b border-beige/10">
      <div className="container mx-auto px-8 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-3xl font-bold tracking-tight group flex items-center space-x-2">
          <motion.span 
            initial={{ rotate: -5 }}
            whileHover={{ rotate: 15 }}
            className="text-primary"
          >
            ☕
          </motion.span>
          <span className="text-primary group-hover:text-primary/80 transition-colors">Breakfast in Bed</span>
          <span className="text-secondary pl-1">Lisboa</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link to="/#card" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-beige/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-beige/20">
                <LanguageSwitcher />
                <Link to="/#cart" onClick={() => setIsOpen(false)} className="relative p-2 text-gray-700">
                  <ShoppingBag size={24} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
