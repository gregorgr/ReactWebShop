import React from 'react';

const ForgotPassword = ({ language }) => {
  const texts = {
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

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <form>
        <label>{texts[language].email}</label>
        <input type="email" placeholder={texts[language].email} />

        <button type="submit">{texts[language].submit}</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
