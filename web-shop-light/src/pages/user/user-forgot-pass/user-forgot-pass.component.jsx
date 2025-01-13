//import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="text-center my-4">{t('forgotPassword.title')}</h2>
      <form>
        <label>{t('forgotPassword.email')}</label>
        <input type="email" placeholder={t('forgotPassword.email')} />

        <button type="submit" className="btn btn-primary w-100">{t('forgotPassword.submit')}</button>
      </form>

      <div className='user-log-navigation text-center mt-3'>
    <Link to="/user/register" className="text-primary">
      {t('login.register')}
    </Link>
  </div>
  <div className="text-center mt-2">
    <Link to="/user/login" className="text-secondary">
      {t('login.login')}
    </Link>
  </div>
    </div> </div> </div>
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