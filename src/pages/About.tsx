import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="space-y-24 pb-24">
      <section className="container mx-auto px-6 pt-12 text-center max-w-3xl space-y-6">
        <h1 className="font-display text-5xl md:text-7xl text-primary font-bold">The Hygge Lifestyle in Lisbon</h1>
        <p className="text-xl text-gray-500 leading-relaxed font-light italic">
          "Breakfast is not just a meal. It's the most intimate ritual of the day. We believe it should be shared where you feel most comfortable."
        </p>
      </section>

      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-149485981460c-3810c604b087?q=80&w=2070&auto=format&fit=crop" 
            alt="Breakfast spread" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-display text-4xl text-secondary">Our Handmade Concept</h2>
            <p className="text-gray-600 leading-relaxed">
              Every item in our menu is carefully selected from local Lisbon artisans. Our bread is baked in wood-fired ovens, our fruits are sourced from local markets, and our pastries are handmade every morning.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-4xl text-primary">Lisbon Tourism Experience</h2>
            <p className="text-gray-600 leading-relaxed">
              We started with a vision to enhance the stay of travelers in our beautiful city. Instead of searching for the perfect cafe, let the perfect cafe come to your Airbnb or boutique hotel room.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-beige/10 py-24">
        <div className="container mx-auto px-6 text-center space-y-12">
          <h2 className="font-display text-5xl font-bold text-gray-900">Hand-picked Quality</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Local Partners", text: "We work exclusively with small Lisbon bakeries and producers." },
              { title: "Sustainable", text: "100% plastic-free packaging. We value our planet as much as our breakfast." },
              { title: "Premium Service", text: "Direct delivery to your door with a personal touch." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-beige/10"
              >
                <h3 className="font-display text-2xl mb-4 text-primary">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
