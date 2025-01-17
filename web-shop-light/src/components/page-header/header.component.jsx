//import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MainNavigation from '../../navigation/main-navigator/main-navigator.component';
import UserNavigation from  '../../navigation/user-navigation/user-navigation.component';//'../../navigation/user-navigation/user-navigation.component';

import logo from '../../assets/logo.png';

import './header.styles.scss';

const PageHeader = ({ language }) => {
 // import { useTranslation } from 'react-i18next';
 const { t, i18n } = useTranslation();
 const currentLanguage = i18n.language; // Trenutni jezik
 language = currentLanguage;
    const labels = {
      en: ['Home', 'User', 'Orders', 'Search'],
      sl: ['Na prvo stran', 'Uporabnik', 'Naročila', 'Iskanje'],
 };
 // console.log("Header:Language prop:", language);


  return (
    <header>
     <nav className='navbar navbar-expand-lg navbar-light shadow'>

     <div className="container-fluid">

  <div   
  className='navbar-header navbar-brand  logo  align-self-center'
  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#fff' }}
  >
      <Link to="/"
      
      title={labels[language][0]} // Tooltip za vizualne uporabnike
      aria-label={labels[language][0]}// Dostopna oznaka za bralnike zaslona
      tabIndex="10" // Omogoča fokus s tipkovnico
    
      >
        <img src={logo} alt="Logo"  title="Logo" /> <span>Brenkalo</span>
      </Link>
  </div>
  {
    //  <div className="nav navbar-nav navbar-right" id="templatemo_main_nav">
    // nav navbar-nav navbar-right
    // align-self-center  flex-fill  d-lg-flex justify-content-lg-between

    // nav navbar-nav navbar-rightalign-self-center
   // flex-fill  d-lg-flex justify-content-lg-between
   //  
  }
  <div className="nav navbar-nav navbar-right menu-container" id="templatemo_main_nav">
        <MainNavigation language={language}  />
        <UserNavigation language={language}  />
  </div>

  
</div>
</nav>
    </header>
  );
};

// Dodaj validacijo za props z uporabo PropTypes
PageHeader.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
 // setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};

export default PageHeader;


/*


import PropTypes from 'prop-types';
Header.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
  setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};

    
        <UserNavavigation language={language} />


                <button onClick={() => setLanguage(language === 'en' ? 'sl' : 'en')}>
      {language === 'en' ? 'Slovensko' : 'English'}
      </button>
*/
