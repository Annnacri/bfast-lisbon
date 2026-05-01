import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import './i18n';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Success from './pages/Success';
import { CartProvider } from './context/CartContext';

import CustomCursor from './components/CustomCursor';

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <CustomCursor />
          <Navbar />
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/sucesso" element={<Success />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
