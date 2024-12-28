import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

//import { LanguageContext } from '../../../context/language-context/language-context';

const ChangePassword = () => {
  //const { language } = useContext(LanguageContext);
  const { t } = useTranslation();


  return (
    <div>
      <h2>{t("ChangePassword.title")}</h2>
      <form>
        <label>{t("ChangePassword.oldPassword")}</label>
        <input type="password" placeholder={t("ChangePassword.oldPassword")} />

        <label>{t("ChangePassword.newPassword")}</label>
        <input type="password" placeholder={t("ChangePassword.newPassword")} />

        <label>{t("ChangePassword.confirmPassword")}</label>
        <input type="password" placeholder={t("ChangePassword.confirmPassword")} />

        <button type="submit">{t("ChangePassword.submit")}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
