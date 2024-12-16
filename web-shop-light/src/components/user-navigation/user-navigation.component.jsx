//import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping , faPenToSquare, faPaintbrush } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

import './user-navigation.stayles.scss';


const UserNavavigation = ({ language }) => {
  const labels = {
    en: ['Search', 'Cart', 'User', 'Edit', 'Orders', 'Theme'],
    sl: ['Iskanje', 'Košarica', 'Uporabnik', 'Uredi', 'Naročila', 'Tema' ],
  };

  const cartLabels = {
    en: ['Cart', 'Go to your shopping cart'],
    sl: ['Košarica', 'Pojdi v svojo košarico'],
  };

  return (
    <div className='user-chart-nav'>
      <ul style={{ display: 'flex', gap: '1rem',  listStyle: 'none', }}>
        <li><Link to="/search"
         title={labels[language][0]} // Tooltip za vizualne uporabnike
         aria-label={labels[language][3]}// Dostopna oznaka za bralnike zaslona
         tabIndex="20" // Omogoča fokus s tipkovnico
         style={{
           display: 'flex',
           alignItems: 'center',
           gap: '0.5rem',
           textDecoration: 'none',
           color: 'inherit',
         }}
       >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" /></Link>
        </li>
       
       <li><Link
            to="/cart"
            title={cartLabels[language][1]} // Tooltip za vizualne uporabnike
            aria-label={cartLabels[language][1]} // Dostopna oznaka za bralnike zaslona
            tabIndex="21" // Omogoča fokus s tipkovnico
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              size="lg"
              role="img" // Označi ikono kot sliko
              aria-label={language === 'en' ? 'Shopping Cart Icon' : 'Ikona košarice'}
            />  
            <span></span>
          </Link>
        </li>
        <li className='dropdown'><Link to="/user"
          className='"dropbtn'
          title={labels[language][2]} // Tooltip za vizualne uporabnike
          aria-label={labels[language][2]}// Dostopna oznaka za bralnike zaslona
          tabIndex="22" // Omogoča fokus s tipkovnico
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        ><FontAwesomeIcon icon={faUser} size="lg" /></Link>
        {/* Dropdown meni */}
        <div className="dropdown-content">

            <Link to="/user"
              
              title={labels[language][3]} // Tooltip za vizualne uporabnike
              aria-label={labels[language][3]}// Dostopna oznaka za bralnike zaslona
              tabIndex="22" // Omogoča fokus s tipkovnico
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
              }}
            ><FontAwesomeIcon icon={faPenToSquare} size="lg" />{labels[language][3]} </Link>
            
            <Link to="/orders"
                      title={labels[language][4]} // Tooltip za vizualne uporabnike
                      aria-label={labels[language][4]}// Dostopna oznaka za bralnike zaslona
                      tabIndex="23" // Omogoča fokus s tipkovnico
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
            
            
            >{labels[language][4]}</Link>
            <Link to="/orders"
                      title={labels[language][5]} // Tooltip za vizualne uporabnike
                      aria-label={labels[language][5]}// Dostopna oznaka za bralnike zaslona
                      tabIndex="23" // Omogoča fokus s tipkovnico
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
            
            
            ><FontAwesomeIcon icon={faPaintbrush} size="lg" />{labels[language][5]}</Link>

        </div>
       
        
        </li>
       
      </ul>
    </div>
  );
};

UserNavavigation.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
  setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};

export default UserNavavigation;


/*
  <FontAwesomeIcon icon={faGlobe} size="lg" />

*/