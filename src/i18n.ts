import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      "nav": { "home": "Início", "about": "Sobre", "contact": "Contacto" },
      "hero": {
        "title": "Pequeno-almoço premium entregue na sua cama",
        "subtitle": "Experiência de brunch artesanal em Lisboa",
        "cta": "Pedir Agora"
      },
      "menu": {
        "title": "Nossos Menus", "extras": "Extras", "add_to_cart": "Adicionar ao Carrinho",
        "rule_extra": "Extras (Bifanas, Salgados, etc.) apenas disponíveis com um menu principal. Tortas inteiras podem ser pedidas sozinhas."
      },
      "cart": { "title": "Seu Carrinho", "empty": "Seu carrinho está vazio", "total": "Total", "checkout": "Finalizar Pedido" },
      "steps": { "date": "Selecionar Data", "time": "Selecionar Horário", "details": "Seus Detalhes" },
      "contact": { "title": "Entre em Contacto", "form": { "name": "Nome", "email": "Email", "phone": "Telemóvel", "message": "Mensagem", "send": "Enviar" } }
    }
  },
  en: {
    translation: {
      "nav": { "home": "Home", "about": "About", "contact": "Contact" },
      "hero": {
        "title": "Premium Breakfast Delivered to Your Bed",
        "subtitle": "Artisanal brunch experience in Lisbon",
        "cta": "Order Now"
      },
      "menu": {
        "title": "Our Menus", "extras": "Extras", "add_to_cart": "Add to Cart",
        "rule_extra": "Extras (Bifanas, snacks, etc.) only available with a main menu. Whole cakes can be ordered standalone."
      },
      "cart": { "title": "Your Cart", "empty": "Your cart is empty", "total": "Total", "checkout": "Checkout" },
      "steps": { "date": "Select Date", "time": "Select Time Slot", "details": "Your Details" },
      "contact": { "title": "Get in Touch", "form": { "name": "Name", "email": "Email", "phone": "Phone", "message": "Message", "send": "Send" } }
    }
  },
  es: {
    translation: {
      "nav": { "home": "Inicio", "about": "Nosotros", "contact": "Contacto" },
      "hero": { "title": "Desayuno de alta gama entregado en tu cama", "subtitle": "Experiencia de brunch artesanal en Lisboa", "cta": "Pedir Ahora" },
      "menu": { "title": "Nuestros Menús", "extras": "Extras", "add_to_cart": "Añadir al Carrito", "rule_extra": "Extras solo disponibles con un menú principal." },
      "cart": { "title": "Tu Carrito", "empty": "Tu carrito está vacío", "total": "Total", "checkout": "Finalizar Pedido" },
      "steps": { "date": "Seleccionar Fecha", "time": "Seleccionar Horario", "details": "Tus Datos" },
      "contact": { "title": "Ponte en Contacto", "form": { "name": "Nombre", "email": "Email", "phone": "Teléfono", "message": "Mensaje", "send": "Enviar" } }
    }
  },
  fr: {
    translation: {
      "nav": { "home": "Accueil", "about": "À Propos", "contact": "Contact" },
      "hero": { "title": "Petit-déjeuner premium livré dans votre lit", "subtitle": "Expérience de brunch artisanal à Lisbonne", "cta": "Commander Maintenant" },
      "menu": { "title": "Nos Menus", "extras": "Extras", "add_to_cart": "Ajouter au Panier", "rule_extra": "Suppléments uniquement disponibles avec un menu principal." },
      "cart": { "title": "Votre Panier", "empty": "Votre panier est vide", "total": "Total", "checkout": "Commander" },
      "steps": { "date": "Choisir une Date", "time": "Choisir un Créneau", "details": "Vos Coordonnées" },
      "contact": { "title": "Contactez-nous", "form": { "name": "Nom", "email": "Email", "phone": "Téléphone", "message": "Message", "send": "Envoyer" } }
    }
  },
  de: {
    translation: {
      "nav": { "home": "Startseite", "about": "Über uns", "contact": "Kontakt" },
      "hero": { "title": "Premium-Frühstück direkt in Ihr Bett geliefert", "subtitle": "Handwerklich hergestelltes Brunch-Erlebnis in Lissabon", "cta": "Jetzt bestellen" },
      "menu": { "title": "Unsere Menüs", "extras": "Extras", "add_to_cart": "In den Warenkorb", "rule_extra": "Extras sind nur zusammen mit einem Hauptmenü erhältlich." },
      "cart": { "title": "Ihr Warenkorb", "empty": "Ihr Warenkorb ist leer", "total": "Gesamt", "checkout": "Zur Kasse" },
      "steps": { "date": "Datum wählen", "time": "Zeitfenster wählen", "details": "Ihre Daten" },
      "contact": { "title": "Kontakt aufnehmen", "form": { "name": "Name", "email": "Email", "phone": "Telefon", "message": "Nachricht", "send": "Senden" } }
    }
  },
  it: {
    translation: {
      "nav": { "home": "Home", "about": "Chi Siamo", "contact": "Contatti" },
      "hero": { "title": "Colazione premium consegnata a letto", "subtitle": "Esperienza di brunch artigianale a Lisbona", "cta": "Ordina Ora" },
      "menu": { "title": "I nostri Menu", "extras": "Extra", "add_to_cart": "Aggiungi al Carrello", "rule_extra": "Extra disponibili solo con un menu principale." },
      "cart": { "title": "Il tuo Carrello", "empty": "Il carrello è vuoto", "total": "Totale", "checkout": "Pagamento" },
      "steps": { "date": "Seleziona Data", "time": "Seleziona Orario", "details": "I tuoi Dati" },
      "contact": { "title": "Mettetevi in contatto", "form": { "name": "Nome", "email": "Email", "phone": "Telefono", "message": "Messaggio", "send": "Invia" } }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
