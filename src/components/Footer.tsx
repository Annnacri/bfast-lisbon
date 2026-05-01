import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-beige/40">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <h3 className="font-display text-3xl font-bold text-primary">Breakfast in Bed <span className="text-secondary">Lisboa</span></h3>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Curating high-end breakfast experiences for selective travelers and Lisbon locals. Artisanal, sustainable, and delivered with love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-beige/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-beige/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-display text-xl text-gray-800">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <span>info@breakfasinbedlx.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <span>+351 964 423 221 (WhatsApp)</span>
              </li>
              <li>Delivery Areas: Lisbon Central, Arroios, Baixa, Campo de Ourique.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-display text-xl text-gray-800">Experience</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Our Hygge Philosophy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability Commitment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partnering with Local Bakeries</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-beige/10 flex flex-col md:row items-center justify-between text-[11px] text-gray-400 uppercase tracking-widest gap-4">
          <p>© 2026 Breakfast in Bed Lisboa. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
