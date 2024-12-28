import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n'; // Preverite, ali je vaša konfiguracija i18n pravilno nastavljena

// Ustvarjanje LanguageContext
export const LanguageContext = createContext();


// Zagotovite LanguageProvider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || 'en'); // Inicializacija jezika

  // Funkcija za spreminjanje jezika
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Sprememba jezika v i18n
    setLanguage(lng); // Posodobitev stanja jezika
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};