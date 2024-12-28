import { useState , useContext} from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
//import UserSidebar from './user-sidebar.component.js';
import { LanguageContext } from '../../../context/language-context/language-context';
// 
import './edit-user.styles.scss';


const EditUser = ({  }) => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  
  console.log("EditUser")
    // Teksti za večjezičnost
    /*
    const texts = {
      en: {
        title: 'User Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        submit: 'Save Information',
      },
      sl: {
        title: 'Uporabniški podatki',
        firstName: 'Ime',
        lastName: 'Priimek',
        email: 'E-poštni naslov',
        phone: 'Telefonska številka',
        submit: 'Shrani podatke',
      },
    };*/
  
    return (
      <div>
        <h2>{t('EditUser.title')}</h2>
        <form>
          {/* Ime */}
          <div>
            <label>{t('EditUser.firstName')}</label>
            <input
              type="text"
              placeholder={t('EditUser.firstName')}
              name="firstName"
            />
          </div>
  
          {/* Priimek */}
          <div>
            <label>{t('EditUser.lastName')}</label>
            <input
              type="text"
              placeholder={t('EditUser.lastName')}
              name="lastName"
            />
          </div>
  
          {/* Email */}
          <div>
            <label>{t('EditUser.email')}</label>
            <input
              type="email"
              placeholder={t('EditUser.email')}
              name="email"
            />
          </div>
  
          {/* Telefon */}
          <div>
            <label>{t('EditUser.phone')}</label>
            <input
              type="tel"
              placeholder={t('EditUser.phone')}
              name="phone"
            />
          </div>
  
          {/* Gumb za oddajo */}
          <button type="submit">{t('EditUser.submit')}</button>
        </form>
      </div>
    );
  };

  /*EditUser.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
  setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija

  */
// };


export default EditUser;