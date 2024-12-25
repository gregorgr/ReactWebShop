import React from 'react';

const RegisterUser = ({ language }) => {
  const texts = {
    en: {
      title: 'Register',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Register',
    },
    sl: {
      title: 'Registracija',
      name: 'Polno ime',
      email: 'E-naslov',
      password: 'Geslo',
      confirmPassword: 'Potrdite geslo',
      submit: 'Registriraj se',
    },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <form>
        <label>{texts[language].name}</label>
        <input type="text" placeholder={texts[language].name} />

        <label>{texts[language].email}</label>
        <input type="email" placeholder={texts[language].email} />

        <label>{texts[language].password}</label>
        <input type="password" placeholder={texts[language].password} />

        <label>{texts[language].confirmPassword}</label>
        <input type="password" placeholder={texts[language].confirmPassword} />

        <button type="submit">{texts[language].submit}</button>
      </form>
    </div>
  );
};

export default RegisterUser;
