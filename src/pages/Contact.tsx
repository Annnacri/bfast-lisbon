import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-24 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-7xl text-primary font-bold">{t('contact.title')}</h1>
            <p className="text-gray-500 text-lg">We'd love to hear from you. Questions about catering, delivery areas, or just to say hello.</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl">Email</h4>
                <p className="text-gray-500">info@breakfasinbedlx.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl">WhatsApp</h4>
                <p className="text-gray-500">+351 964 423 221</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-beige/20 rounded-full flex items-center justify-center text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl">Main Hub</h4>
                <p className="text-gray-500">Lisbon Central District, Portugal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="premium-card p-8 md:p-12 space-y-8">
          <h3 className="font-display text-3xl">Send Us a Message</h3>
          {isSent ? (
            <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
              <p className="font-medium">Thank you! Your message has been sent. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider font-sans">{t('contact.form.name')}</label>
                <input type="text" required className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all" placeholder="Your Name" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider font-sans">{t('contact.form.email')}</label>
                <input type="email" required className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all" placeholder="your@email.com" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold text-gray-400 tracking-wider font-sans">{t('contact.form.message')}</label>
                <textarea rows={4} required className="w-full bg-cream/50 border border-beige/40 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center space-x-3">
                <span>{t('contact.form.send')}</span>
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
