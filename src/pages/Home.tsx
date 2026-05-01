import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MENUS, EXTRAS, PROMOTIONS } from '../constants';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ShoppingCart, Calendar, Clock, MapPin, User, ChevronRight, X, ShoppingBag, Loader2 } from 'lucide-react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { redirectToCheckout } from '../lib/stripe';

export default function Home() {
  const { t } = useTranslation();
  const { addToCart, cart, total, updateQuantity, removeFromCart } = useCart();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState('08:00 - 09:00');
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const hasMainMenu = cart.some(item => item.category === 'main');

  const handleAddToCart = (item: any) => {
    // Check if item requires a main menu (it's an extra and not standalone)
    if (item.category === 'extra' && !item.standalone && !hasMainMenu) {
      alert(t('menu.rule_extra'));
      return;
    }
    addToCart(item);
  };

  const handleCheckout = async () => {
    if (!selectedDate || !selectedTime || !orderDetails.name || !orderDetails.email || !orderDetails.address) {
      alert("Por favor, preencha todos os detalhes do pedido.");
      return;
    }

    const hasMain = cart.some(item => item.category === 'main');
    const hasDependentExtras = cart.some(item => item.category === 'extra' && !item.standalone);
    
    if (hasDependentExtras && !hasMain) {
      alert(t('menu.rule_extra'));
      return;
    }
    
    setIsCheckoutLoading(true);
    try {
      await redirectToCheckout(cart, orderDetails, {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime
      });
    } catch (err) {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-40 -mr-64 -mt-32 pointer-events-none animate-pulse"></div>
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-40 -ml-48 pointer-events-none"></div>
      <div className="absolute top-[2500px] right-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl opacity-40 -mr-32 pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070&auto=format&fit=crop" 
            alt="Lisbon breakfast" 
            className="w-full h-full object-cover brightness-75"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-10 text-cream/90"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#FFB300', color: '#FF7043' }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent hover:bg-accent text-primary px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-accent/40 transition-all flex items-center mx-auto space-x-3"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t('hero.cta')}</span>
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="container mx-auto px-6">
        <div className="bg-secondary/10 rounded-3xl p-8 md:p-12 border border-secondary/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Stay tuned</span>
              <h2 className="font-display text-3xl text-secondary">Seasonal Lisbon Offers</h2>
              <p className="text-gray-600">Enjoy the best flavors of the season delivered directly to your doorstep. Boutique experience, artisanal quality.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROMOTIONS.map(promo => (
                <div key={promo.id} className="bg-white p-4 rounded-2xl border border-accent/20 text-sm font-bold text-primary shadow-sm hover:scale-105 transition-transform flex items-center space-x-2">
                  <span className="text-xl">✨</span>
                  <span>{promo.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-5xl text-primary">{t('menu.title')}</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MENUS.map((item) => (
            <motion.div 
              key={item.id} 
              whileHover={{ y: -12, scale: 1.02 }}
              className="premium-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-2xl font-bold leading-tight">{item.name}</h3>
                </div>
                <div className="w-12 h-1 bg-accent/40 rounded-full"></div>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line font-medium italic">
                  {item.description}
                </p>
                <div className="pt-4">
                  <span className="text-primary text-2xl font-bold">€{item.price.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleAddToCart(item)}
                className="w-full bg-cream border border-beige/40 hover:bg-primary hover:border-primary hover:text-white text-primary py-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 font-bold relative z-10 shadow-sm"
              >
                <Plus size={20} />
                <span>{t('menu.add_to_cart')}</span>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display text-3xl text-secondary">{t('menu.extras')}</h3>
            <p className="text-gray-400 text-xs italic italic">{t('menu.rule_extra')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXTRAS.map((item) => (
              <div key={item.id} className="premium-card p-5 flex items-center justify-between border-l-4 border-l-secondary">
                <div className="space-y-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                  <span className="text-secondary font-bold text-sm">€{item.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="p-3 bg-secondary/10 hover:bg-secondary hover:text-white text-secondary rounded-full transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm italic">{t('menu.rule_extra')}</p>
        </div>
      </section>

      {/* Benefits & Testimonials */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <MapPin size={32} />
            </div>
            <h3 className="font-display text-2xl">Delivery Areas</h3>
            <p className="text-gray-500 text-sm">We deliver to Baixa, Arroios, Campo de Ourique, Alfama, and Graça. Check our map for full coverage.</p>
          </div>
          <div className="space-y-4 text-center p-8 bg-white rounded-3xl shadow-sm border border-beige/10 italic">
            <p className="text-gray-600 text-sm">"The best way to start a morning in Lisbon. The eggs were still warm and the orange juice tasted like sunshine."</p>
            <div className="pt-4">
              <p className="font-display font-bold text-primary">Julianne R.</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Guest from NYC</p>
            </div>
          </div>
          <div className="space-y-4 text-center p-8 bg-white rounded-3xl shadow-sm border border-beige/10 italic">
            <p className="text-gray-600 text-sm">"Such a premium feel. We ordered for our anniversary and it made our stay so much more special. Highly recommend the Vitamina C menu."</p>
            <div className="pt-4">
              <p className="font-display font-bold text-primary">Marco G.</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Lisbon Resident</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart & Checkout Section */}
      <section id="cart" className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Order Configuration */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                <Calendar />
                <h3 className="font-display text-2xl">{t('steps.date')}</h3>
              </div>
              <div className="calendar-container premium-card p-4">
                <CalendarComponent 
                  onChange={setSelectedDate} 
                  value={selectedDate}
                  minDate={new Date()}
                  className="border-none w-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                <Clock />
                <h3 className="font-display text-2xl">{t('steps.time')}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00'].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 px-4 rounded-xl text-sm transition-all border ${selectedTime === slot ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white border-beige/40 text-gray-600 hover:border-primary/40'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary">
                <User />
                <h3 className="font-display text-2xl">{t('steps.details')}</h3>
              </div>
              <div className="premium-card p-8 grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                      className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                      placeholder="Ana Silva"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Email</label>
                    <input 
                      type="email" 
                      value={orderDetails.email}
                      onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                      className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                      placeholder="ana@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Phone</label>
                    <input 
                      type="tel" 
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                      className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                      placeholder="+351 900 000 000"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-gray-400 tracking-wider">Accommodation Address</label>
                    <input 
                      type="text" 
                      value={orderDetails.address}
                      onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                      className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                      placeholder="Rua Garrett 12, Lisbon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 text-secondary">
              <ShoppingCart />
              <h3 className="font-display text-3xl">{t('cart.title')}</h3>
            </div>
            
            <div className="premium-card overflow-hidden">
              <div className="p-8 space-y-6 max-h-[600px] overflow-y-auto">
                <AnimatePresence initial={false}>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                      <p>{t('cart.empty')}</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center justify-between py-4 border-b border-beige/20 last:border-0"
                      >
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-secondary text-sm font-bold">€{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-beige/20 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:text-primary transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:text-primary transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="bg-beige/10 p-8 space-y-6">
                  <div className="flex justify-between items-center text-xl font-display">
                    <span className="text-gray-500">{t('cart.total')}</span>
                    <span className="text-primary font-bold">€{total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {isCheckoutLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <span>{t('cart.checkout')}</span>
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-400">Secured payment via Stripe Checkout. Delivery availability guaranteed within Lisbon central areas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


