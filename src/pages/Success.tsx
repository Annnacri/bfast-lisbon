import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderRef, setOrderRef] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      // Simulate/Implement order saving
      const ref = 'LX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      setOrderRef(ref);
      
      // We could fetch session details from our API to get cart items if not in local state
      // For now, we clear the cart as the payment was successful
      clearCart();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-8"
      >
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6 font-bold">
          <CheckCircle size={64} />
        </div>
        <div className="space-y-4">
          <h1 className="font-display text-4xl text-gray-900 font-bold">Order Confirmed!</h1>
          <p className="text-gray-500 leading-relaxed">
            Thank you for choosing Breakfast in Bed Lisboa. Your artisan breakfast is being prepared and will be delivered on your selected date.
          </p>
        </div>

        {orderRef && (
          <div className="bg-primary/5 py-4 px-6 rounded-xl border border-primary/10">
            <span className="text-xs uppercase font-bold text-primary/60 tracking-widest">Order Reference</span>
            <p className="text-xl font-mono font-bold text-primary">{orderRef}</p>
          </div>
        )}

        <div className="p-6 bg-beige/10 rounded-2xl border border-beige/20 text-left space-y-2">
          <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">What's Next?</h4>
          <p className="text-sm text-gray-600 italic">"Check your email for the order receipt and confirmation. Our courier will contact you 15 minutes before delivery."</p>
        </div>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <span>Back to Home</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
