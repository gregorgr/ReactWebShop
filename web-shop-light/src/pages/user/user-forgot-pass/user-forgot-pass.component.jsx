//import React from 'react';
import { useState , useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { useAuth } from '../../../context/auth-context/auth-context.utils';

const ForgotPassword = () => {
  
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
  const [formClass, setFormClass] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const {forgotPassword } = useAuth();
  const [disabledForm, setDisabledForm]= useState('');
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage(""); // clear error
      setFormError("");
      setDisabledForm("");
      await forgotPassword(email);
      setFormClass("post-form-hidden");
      setDisabledForm("disabled");
      setMessage('Password reset email sent successfully');
    } catch (error) {
      setFormError('Failed to send password reset email');
      console.error(error);
    }
  };


  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="text-center my-4">{t('forgotPassword.title')}</h2>
        <div className={`form-container ${formClass}`}>
          <form onSubmit={handleSubmit}>
            <label>{t('forgotPassword.email')}</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              placeholder={t('forgotPassword.email')} />

            <button disabled={disabledForm} type="submit" className="btn btn-primary w-100">{t('forgotPassword.submit')}</button>
            {formError && <p style="color: red;">{formError}</p>}
            {message && <p>{message}</p>}
        </form>
      </div>
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