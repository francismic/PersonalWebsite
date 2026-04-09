import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const toggle = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
