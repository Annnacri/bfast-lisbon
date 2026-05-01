import { MenuItem } from './types';

export const MENUS: MenuItem[] = [
  {
    id: 'menu-vitamina-c',
    name: 'Menu Vitamina C',
    price: 9.90,
    description: '• Sumo de laranja\n• Torta de laranja caseira\n• Quiche de cogumelos\n• Croissants recheados com queijo cottage e kiwi',
    category: 'main'
  },
  {
    id: 'menu-portugues',
    name: 'Menu Português',
    price: 8.90,
    description: '• Leite com chocolate\n• Pão de mistura c/ presunto\n• Pastel de bacalhau\n• Pastel de nata',
    category: 'main'
  },
  {
    id: 'menu-brunch',
    name: 'Menu Brunch',
    price: 14.90,
    description: '• Sumo de laranja\n• Ovos mexidos com farinheira\n• Mini tostas\n• Rissol de camarão\n• Rissol de leitão\n• Patê de sardinha\n• Tarte caseira de maça',
    category: 'main'
  },
  {
    id: 'menu-summer',
    name: 'Menu Summer',
    price: 9.90,
    description: '• Limonada fresca\n• Queijo fresco\n• Tosta de pasta de atum com alface\n• Torta de limão\n• Tarte de pêra e chocolate',
    category: 'main'
  }
];

export const EXTRAS: MenuItem[] = [
  {
    id: 'extra-bifana',
    name: 'Bifana á Portuguesa, no pão',
    price: 3.90,
    description: 'Bifana traditional pork sandwich.',
    category: 'extra'
  },
  {
    id: 'extra-prego',
    name: 'Prego no pão c/ pickles',
    price: 4.90,
    description: 'Beef prego with pickles.',
    category: 'extra'
  },
  {
    id: 'extra-croquette',
    name: 'Croquete de vitela',
    price: 1.90,
    description: 'Veal croquette.',
    category: 'extra'
  },
  {
    id: 'extra-rissol-leitao',
    name: 'Rissol de leitão',
    price: 3.90,
    description: 'Suckling pig rissol.',
    category: 'extra'
  },
  {
    id: 'extra-orange-cake',
    name: 'Torta inteira de Laranja caseira',
    price: 18.00,
    description: 'Fresh homemade orange cake.',
    category: 'extra',
    standalone: true
  },
  {
    id: 'extra-lemon-cake',
    name: 'Torta inteira de Limão',
    price: 18.00,
    description: 'Zesty lemon cake.',
    category: 'extra',
    standalone: true
  }
];

export const DELIVERY_SLOTS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00'
];

export const PROMOTIONS = [
  {
    id: 'promo-1',
    text: '“Stay tuned — frequent special offers”',
    active: true
  },
  {
    id: 'promo-2',
    text: '“Buy 5 breakfasts, get 1 free item”',
    active: true
  },
  {
    id: 'promo-3',
    text: '“Early morning discounts before 9am”',
    active: true
  },
  {
    id: 'promo-4',
    text: '“Seasonal Lisbon offers”',
    active: true
  }
];
