import React from 'react';

const ChangePassword = ({ language }) => {
  const texts = {
    en: {
      title: 'Change Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      submit: 'Change Password',
    },
    sl: {
      title: 'Spremeni geslo',
      oldPassword: 'Staro geslo',
      newPassword: 'Novo geslo',
      confirmPassword: 'Potrdite novo geslo',
      submit: 'Spremeni geslo',
    },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <form>
        <label>{texts[language].oldPassword}</label>
        <input type="password" placeholder={texts[language].oldPassword} />

        <label>{texts[language].newPassword}</label>
        <input type="password" placeholder={texts[language].newPassword} />

        <label>{texts[language].confirmPassword}</label>
        <input type="password" placeholder={texts[language].confirmPassword} />

        <button type="submit">{texts[language].submit}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
