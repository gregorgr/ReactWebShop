//import React from 'react';
import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';

const ForgotPassword = () => {
  const { t } = useTranslation();
 
 /* const texts = {
    en: {
      title: 'Forgot Password',
      email: 'Your Email',
      submit: 'Reset Password',
    },
    sl: {
      title: 'Pozabljeno geslo',
      email: 'Vaš e-naslov',
      submit: 'Ponastavi geslo',
    },
  };
  */
  return (
    <div>
      <h2>{t('forgotPassword.title')}</h2>
      <form>
        <label>{t('forgotPassword.email')}</label>
        <input type="email" placeholder={t('forgotPassword.email')} />

        <button type="submit">{t('forgotPassword.submit')}</button>
      </form>
    </div>
  );
};

/*
ForgotPassword.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
};
*/
export default ForgotPassword;
/*
t('register.title')
    "forgotPassword":{    
            "title": "Forgot Password",
            "email": "Your Email",
            "submit": "Reset Password"     
    }
*/