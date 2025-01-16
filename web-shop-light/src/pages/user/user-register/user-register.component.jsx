//import React from 'react';
import { useState, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context/auth-context.utils';
// import PropTypes from 'prop-types';
//const { t } = useTranslation();
const RegisterUser = () => {

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
  const language = "en";

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
    Tel:'',
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
    userData["PwdRpt"]=userData.pwdrpt;
    console.log("Register: ", userData)
    try {

      await register(userData, currentLanguage);
      // alert('Registration successful');
      setError("");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center my-4">{t('register.title')}</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
      <label htmlFor="username" className="form-label">
        {t('register.username')}
      </label>
      <input
        type="text"
        className="form-control"
        name="username"
        id="username"
        value={userData.username}
        onChange={handleChange}
        required
        placeholder={t('register.username')}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="firstname" className="form-label">
        {t('register.firstname')}
      </label>
      <input
        type="text"
        className="form-control"
        name="firstname"
        id="firstname"
        value={userData.firstname}
        onChange={handleChange}
        required
        placeholder={t('register.firstname')}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="lastname" className="form-label">
        {t('register.lastname')}
      </label>
      <input
        type="text"
        className="form-control"
        name="lastname"
        id="lastname"
        value={userData.lastname}
        onChange={handleChange}
        required
        placeholder={t('register.lastname')}
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="tel" className="form-label">
        {t('register.tel')}
      </label>
      <input
        type="text"
        className="form-control"
        name="Tel"
        id="Tel"
        value={userData.Tel}
        onChange={handleChange}
        required
        placeholder={t('EditUser.phone')}
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="email" className="form-label">
        {t('register.email')}
      </label>
      <input
        type="email"
        className="form-control"
        name="email"
        id="email"
        value={userData.email}
        onChange={handleChange}
        required
        placeholder={t('register.email')}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="pwd" className="form-label">
        {t('register.password')}
      </label>
      {passwordStrength && (
        <p
          className={`text-${passwordStrength === 0 ? 'danger' : 'success'}`}
        >
          {t('register.pwdstrength')}: {getPasswordStrengthDesc(passwordStrength)}
        </p>
      )}
      <input
        type="password"
        className="form-control"
        name="pwd"
        id="pwd"
        value={userData.pwd}
        onChange={handleChange}
        required
        placeholder={t('register.password')}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="pwdrpt" className="form-label">
        {t('register.confirmPassword')}
      </label>
      <input
        type="password"
        className="form-control"
        name="pwdrpt"
        id="pwdrpt"
        value={userData.pwdrpt}
        onChange={handleChange}
        required
        placeholder={t('register.confirmPassword')}
      />
      {passwordMatchError && (
        <p className="text-danger">{t('register.passwordmismatch')}</p>
      )}
    </div>
    <div className='text-center'>
    <button type="submit"  className='form-button save-button '>{t('register.submit')}</button>
    </div>
           
          </form>
          <div className='user-log-navigation text-center'>

          <div className="text-center mt-3">
          <Link to="/user/login" className="text-secondary">
      {t('login.login')}
    </Link>
  </div>
  <div className="text-center mt-2">
    <Link to="/user/forgot-password" className="text-secondary">
      {t('login.forgotPassword')}
    </Link>
  </div>
        </div> 
        </div>
        <div>

          
        </div>
        
      </div> 
    </div>
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
