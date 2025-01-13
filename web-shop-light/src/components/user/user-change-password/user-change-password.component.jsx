import { useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../context/auth-context/auth-context.utils';
//import { LanguageContext } from '../../../context/language-context/language-context';

const UserChangePassword = () => {
  //const { language } = useContext(LanguageContext);
  const { changePassword, user } = useContext(AuthContext);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    pwdrpt: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [passwordMatchError, setPasswordMatchError] = useState(false); // Stanje za preverjanje ujemanja gesel
  const [passwordStrength, setPasswordStrength] = useState(''); // Stanje za preverjanje jakosti gesla




      // Funkcija za preverjanje jakosti gesla
  const evaluatePasswordStrength = (password) => {
        let strength = 0;
    
        if (password.length >= 8) strength++; // Dovolj dolžine
        if (/[A-Z]/.test(password)) strength++; // Velike črke
        if (/[0-9]/.test(password)) strength++; // Številke
        if (/[^A-Za-z0-9]/.test(password)) strength++; // Posebni znaki
    
          return strength;
      };
  
  const getPasswordStrengthDesc = (strength) =>{
  
        switch (strength) {
          case 0:
          case 1:
            return t('register.pwdstrength1'); //'Zelo slabo';
          case 2:
            return t('register.pwdstrength2');//'Slabo';
          case 3:
            return t('register.pwdstrength3'); //'Dobro';
          case 4:
            return t('register.pwdstrength4') ; //'Zelo dobro';
          default:
            return '';
        }
      };


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        // Posodobitev jakosti gesla
        if (name === 'newPassword') {
          setPasswordStrength(evaluatePasswordStrength(value));
        }
    
        // Preverjanje ujemanja gesel
        if (name === 'confirmNewPassword' || name === 'newPassword') {
          setPasswordMatchError(formData.newPassword !== value && name === 'confirmNewPassword');
        }
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMatchError(true);
      return;
    }

    //if (formData.newPassword !== formData.confirmNewPassword) {
    //  setError(t("register.passwordmismatch"));
    //  return;
    //}
    // Preverjanje ujemanja gesel v realnem času
   // if (name === 'pwdrpt' || name === 'pwd') {
   //   setPasswordMatchError(userData.pwd !== value && name === 'pwdrpt');
    //}


    try {
      await changePassword(user.username, formData.oldPassword, formData.newPassword);
      setSuccess('Password changed successfully');
    } catch (err) {
      setError(err.message || 'Failed to change password');
    }
  };



  return (
    <div className="user-form">
    <h1>{t("ChangePassword.title")}</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>{success}</p>}
  
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">{t("ChangePassword.oldPassword")}</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          placeholder={t("ChangePassword.oldPassword")}
        />
      </div>
  
      <div className="form-row">
        <label className="form-label">{t("ChangePassword.newPassword")}</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          placeholder={t("ChangePassword.newPassword")}
        />
      </div>
  
      <div className="form-row">
        <label className="form-label">{t("ChangePassword.confirmPassword")}</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
          placeholder={t("ChangePassword.confirmPassword")}
        />
      </div>
  
      {passwordStrength && (
        <div className="form-row">
          <p
            style={{
              color: passwordStrength === 'Very Weak' ? 'red' : 'green',
            }}
          >
            {t("ChangePassword.passwordStrength")}: {passwordStrength}
          </p>
        </div>
      )}
  
      {passwordMatchError && (
        <div className="form-row">
          <p style={{ color: 'red' }}>{t("ChangePassword.passwordsDoNotMatch")}</p>
        </div>
      )}
  
      <button type="submit" className="form-button save-button">
        {t("ChangePassword.submit")}
      </button>
    </form>
  </div>
  );
};

export default UserChangePassword;
