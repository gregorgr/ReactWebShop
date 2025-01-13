//import React from 'react';
import { useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../context/auth-context/auth-context.utils';
// import PropTypes from 'prop-types';
//const { t } = useTranslation();
const RegisterUser = () => {
  const language = "en";

  const { t } = useTranslation();
  const { register } = useContext(AuthContext);
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
  const [error, setError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false); // Stanje za preverjanje ujemanja gesel
  const [passwordStrength, setPasswordStrength] = useState(''); // Preverjanje jakosti gesla

  const [userData, setUserData] = useState({
    username: '',
    userRole: '',
    firstname: '',
    lastname: '',
    pwd: '',
    pwdrpt: '', // Dodano za potrditev gesla
    email: '',
    userAddresses: [
      {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: 0,
      },    ],
  });

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
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Preverjanje ujemanja gesel v realnem času
    if (name === 'pwdrpt' || name === 'pwd') {
      setPasswordMatchError(userData.pwd !== value && name === 'pwdrpt');
    }

     // Posodobitev jakosti gesla
     if (name === 'pwd') {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData.pwd !== userData.pwdrpt) {
      setPasswordMatchError(true); // Če se gesli ne ujemata
      return;
    }
    try {
      await register(userData);
      alert('Registration successful');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
      <h2 className="text-center my-4">{t('register.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>

        <label>{t('register.username')}</label>
        <input type="text" 
         name="username"
         value={userData.username}
         onChange={handleChange}
         required
         placeholder={t('register.username')} />
        <label>{t('register.firstname')}</label>
        <input type="text" 
         name="firstname"
         value={userData.firstname}
         onChange={handleChange}
         required
         placeholder={t('register.firstname')} />
        <label>{t('register.lastname')}</label>
        <input type="text" 
          name="lastname"
          value={userData.lastname}
          onChange={handleChange}
          required
         placeholder={t('register.lastname')} />

        <label>{t('register.email')}</label>
        <input type="email" 
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
        placeholder={t('register.email')} />

        <label>{t('register.password')}</label>
        {passwordStrength && (
          <p style={{ color: passwordStrength === 0 ? 'red' : 'green' }}>
            {t('register.pwdstrength')}: {getPasswordStrengthDesc(passwordStrength)}
          </p>
        )}
        <input type="password" 
          name="pwd"
          value={userData.pwd}
          onChange={handleChange}
          required  
         placeholder={t('register.password')} />
        

        <label>{t('register.confirmPassword')}</label>
        <input type="password" 
         name="pwdrpt"
         value={userData.pwdrpt}
         onChange={handleChange}
         required
         placeholder={t('register.confirmPassword')} />
        {passwordMatchError && <p style={{ color: 'red' }}>{t('register.passwordmismatch')}</p>}

        <button type="submit" className="btn btn-primary w-100">{t('register.submit')}</button>
      </form>
    </div> </div> </div>
  );
};
/*

  <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">{t('login.title')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">{t('login.email')}</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">{t('login.password')}</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {t('login.submit')}
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/user/register">{t('login.register')}</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/user/forgot-password">{t('login.forgotPassword')}</Link>
          </div>
        </div>
      </div>
    </div>
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
