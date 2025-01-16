//import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LanguageNavigator from '../language-navigator/language-navigator.component';


const MainNavigation = ({ language }) => {
    //  import { useTranslation } from 'react-i18next';
      const { t, i18n } = useTranslation();
      const currentLanguage = i18n.language; 
      language= currentLanguage;
  const labels = {
    en: ['Home', 'Shop', 'Stores', 'Contact', 'Language'],
    sl: ['Domov', 'Trgovina', 'Trgovine', 'Kontakt', 'Jezik'],
  };

  return (

  <>
    {
      // align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between
    }


      <div className="menu-group" id="templatemo_main_nav">
        <div className="flex-fill">
          <ul style={{ display: 'flex', gap: '1rem',  listStyle: 'none' }}>
          
            <li><Link to="/shop">{labels[language][1]}</Link></li>
            <li><Link to="/stores">{labels[language][2]}</Link></li>
            <li><Link to="/contact">{labels[language][3]}</Link></li>
            <li><LanguageNavigator language={language} /></li>
            {
              // 
              //  
            }
           
          </ul>
        </div>
    </div>
  </>

  );
};


MainNavigation.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
 // setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};

export default MainNavigation;

/*

   <Link to="/">{labels[language][0]}</Link>

*/
