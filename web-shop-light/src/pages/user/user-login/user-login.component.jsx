import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//import PropTypes from 'prop-types';

import { AuthContext } from '../../../context/auth-context/auth-context.utils';
//import { useUser } from '../../../context/user/user.context';






const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  //const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('username:', username, 'pwd:', password);

    // Implement login logic here
    
  };
  */

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(username, password);
     // alert('Login successful');
     // console.log(userData);
      navigate('/user'); // Preusmeri uporabnika

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
         

  <h2 className="text-center my-4">{t('login.title')}</h2>
  
  {error && <p className="text-danger text-center">{error}</p>}
  
  <form onSubmit={handleLogin}>
    <div className="form-group mb-3">
      <label htmlFor="username" className="form-label">
        {t('login.username')}
      </label>
      <input
        type="text"
        className="form-control"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder={t('login.usernamePlaceholder')}
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="password" className="form-label">
        {t('login.password')}
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder={t('login.passwordPlaceholder')}
      />
    </div>

    <div className='text-center'>
    <button type="submit"  className='form-button save-button '>
      {t('login.submit')}
    </button>

    </div>

  </form>
  <div className='user-log-navigation text-center'>
  <div className="text-center mt-3">
    <Link to="/user/register" className="text-primary">
      {t('login.register')}
    </Link>
  </div>
  <div className="text-center mt-2">
    <Link to="/user/forgot-password" className="text-secondary">
      {t('login.forgotPassword')}
    </Link>
  </div>
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
