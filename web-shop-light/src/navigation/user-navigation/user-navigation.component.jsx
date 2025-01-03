import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faPenToSquare, faPaintbrush } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../context/auth-context/auth-context.utils';

import PropTypes from 'prop-types';

import './user-navigation.stayles.scss';

//import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartPreview from "../../components/cart-preview/cart-preview.component"; 
// '../components/cart-preview/cart-preview.component';

const UserNavigation = ({ language }) => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const labels = {
    en: ['Search', 'Cart', 'User', 'Edit', 'Orders', 'Theme'],
    sl: ['Iskanje', 'Košarica', 'Uporabnik', 'Uredi', 'Naročila', 'Tema' ],
  };
/*
  const cartLabels = {
    en: ['Cart', 'Go to your shopping cart'],
    sl: ['Košarica', 'Pojdi v svojo košarico'],
  };
*/
/*
  const themeLabels = {
    en: ['Dark/white'],
    sl: ['Temen/svetel']
  }
*/
  /*
 <FontAwesomeIcon
              icon={faCartShopping}
              size="lg"
              role="img" // Označi ikono kot sliko
              aria-label={language === 'en' ? 'Shopping Cart Icon' : 'Ikona košarice'}
            />  
            <span className="cart-counter">{cartCount}</span>
  */
 


  const handleLogout = (e) => {
    e.preventDefault(); // Preprečimo privzeto obnašanje povezave
    logout();
   // navigate('/login'); // Preusmeritev na stran za prijavo
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
       
       <li>

          <CartPreview />
        </li>
        <li className='dropdown'><Link to="/user"
          className='"dropbtn'
          title={ user ? labels[language][2] +': '+user : labels[language][2]} // Tooltip za vizualne uporabnike
          aria-label={ user ? labels[language][2] +': '+user : labels[language][2]}// Dostopna oznaka za bralnike zaslona
          tabIndex="22" // Omogoča fokus s tipkovnico
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        ><FontAwesomeIcon icon={faUser} size="lg" /></Link>
          <div className="dropdown-content">
            { user ? (
              <>
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
                  <Link to="/logout"
                                
                  title={t("login.logout")} // Tooltip za vizualne uporabnike
                  aria-label={t("login.logout")}// Dostopna oznaka za bralnike zaslona
                  tabIndex="22" // Omogoča fokus s tipkovnico
                  href="/user/logout"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  >{t("login.logout")}</Link>
              </>

             ) : (

  <Link to="/user/login"
              
              title={t("login.login")} // Tooltip za vizualne uporabnike
              aria-label={t("login.login")}// Dostopna oznaka za bralnike zaslona
              tabIndex="22" // Omogoča fokus s tipkovnico
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
              }}
              >{t("login.login")}</Link>
              )}
           


              </div>
        {/* Dropdown meni */}
        {
          /*
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
            

      

          </div> 
          */
      } 
        </li>

          <li className='dropdown'><Link
            to="/theme"
            title={labels[language][5]} // Tooltip za vizualne uporabnike
            aria-label={labels[language][5]}// Dostopna oznaka za bralnike zaslona
            tabIndex="30" // Omogoča fokus s tipkovnico
            className='dropbtn'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
         
            
              <FontAwesomeIcon icon={faPaintbrush} size="lg" /><span></span>
              </Link>
                <div className="dropdown-content dropdwn-theme">
                <Link to="/theme/dark"
                        title={labels[language][4]} // Tooltip za vizualne uporabnike
                        aria-label={labels[language][4]}// Dostopna oznaka za bralnike zaslona
                        tabIndex="31" // Omogoča fokus s tipkovnico
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
              
              
              >dark-white</Link>
               <Link to="/theme/dark"
                        title={labels[language][4]} // Tooltip za vizualne uporabnike
                        aria-label={labels[language][4]}// Dostopna oznaka za bralnike zaslona
                        tabIndex="31" // Omogoča fokus s tipkovnico
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
              
              
              >črno-bela (Visok kontrast)</Link>
               <Link to="/theme/dark"
                        title={labels[language][4]} // Tooltip za vizualne uporabnike
                        aria-label={labels[language][4]}// Dostopna oznaka za bralnike zaslona
                        tabIndex="31" // Omogoča fokus s tipkovnico
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
              
              
              >Modro-rumena</Link>
                             <Link to="/theme/dark"
                        title={labels[language][4]} // Tooltip za vizualne uporabnike
                        aria-label={labels[language][4]}// Dostopna oznaka za bralnike zaslona
                        tabIndex="31" // Omogoča fokus s tipkovnico
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
              
              
              >Pastelna shema z visoko berljivostjo</Link>
              </div>
            </li>       
      </ul>
      
    </div>
  );
};

UserNavigation.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
 // setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};

export default UserNavigation;


/*
  <FontAwesomeIcon icon={faGlobe} size="lg" />

*/