import React from 'react';
import PropTypes from 'prop-types';

import './contact.styles.scss';


const Contact = ({ language }) => {
  const texts = {
    en: {
      title: 'Contact Us',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      submit: 'Submit',
    },
    sl: {
      title: 'Kontaktirajte nas',
      name: 'Vaše ime',
      email: 'Vaš e-naslov',
      message: 'Vaše sporočilo',
      submit: 'Pošlji',
    },
  };

  return (
    <section className="container py-5">
    <div className="row text-center pt-3">
        <div className="col-lg-6 m-auto">
      <h2>{texts[language].title}</h2>
      <form>
        <label>{texts[language].name}</label>
        <input type="text" placeholder={texts[language].name} />

        <label>{texts[language].email}</label>
        <input type="email" placeholder={texts[language].email} />

        <label>{texts[language].message}</label>
        <textarea placeholder={texts[language].message} rows="4" />

        <button type="submit">{texts[language].submit}</button>
      </form>
    </div></div></section>
  );
};

export default Contact;
