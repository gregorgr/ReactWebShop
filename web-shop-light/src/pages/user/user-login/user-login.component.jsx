import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);

    // Implement login logic here

    
  };

  return (
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
            <Link to="/register">{t('login.register')}</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/forgot-password">{t('login.forgotPassword')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
LoginPage.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
};*/

export default LoginPage;
