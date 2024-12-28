//import React from 'react';
import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
//const { t } = useTranslation();
const RegisterUser = () => {
  const language = "en";

  const { t } = useTranslation();
  /*
  const texts = {
    en: {
      title: 'Register',
    },
    sl: {
      title: 'Registracija',
    },
  };*/
  //texts[language].title
  return (
    <div className="container text-center mt-5">
      <h2>{t('register.title')}</h2>
      <form>
        <label>{t('register.name')}</label>
        <input type="text" placeholder={t('register.name')} />

        <label>{t('register.email')}</label>
        <input type="email" placeholder={t('register.email')} />

        <label>{t('register.password')}</label>
        <input type="password" placeholder={t('register.password')} />

        <label>{t('register.confirmPassword')}</label>
        <input type="password" placeholder={t('register.confirmPassword')} />

        <button type="submit">{t('register.submit')}</button>
      </form>
    </div>
  );
};
/*

 "register":{
        "title": "Register new user",
        "name": "Full Name",
        "email": "Email",
        "password": "Password",

    },
RegisterUser.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
};*/

export default RegisterUser;
