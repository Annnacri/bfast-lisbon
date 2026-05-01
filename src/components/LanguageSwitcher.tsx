import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
        <Globe size={18} />
        <span className="uppercase">{i18n.language.slice(0, 2)}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 border border-beige/20">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-beige/10 transition-colors ${i18n.language === lang.code ? 'text-primary font-semibold' : 'text-gray-600'}`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
