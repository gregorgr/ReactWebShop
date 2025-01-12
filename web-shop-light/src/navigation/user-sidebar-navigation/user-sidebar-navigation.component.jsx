import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './user-sidebar-navigation.styles.scss';

import { AuthContext } from '../../context/auth-context/auth-context.utils';

const texts = {
    sl: {
      edit: 'Uredi podatke',
      address: 'Naslov za dostavo',
      orders: 'Naročila',
      change_pass: 'Spremeni geslo',
    },
    en: {
      edit: 'Edit user',
      address: 'Addresses',
      orders: 'Orders',
      change_pass: 'Change password',

    },
 
  };

/*
<Link to="/search"
         title={labels[language][0]} // Tooltip za vizualne uporabnike
         aria-label={labels[language][3]}// Dostopna oznaka za bralnike zaslona
         tabIndex="20" // Omogoča fokus s tipkovnico
         style={{
           display: 'flex',
           alignItems: 'center',
           gap: '0.5rem',
           textDecoration: 'none',
           color: 'inherit',
         }}
       >

*/
const UserSidebarNavigation = ({ language = 'sl' }) => {

  const { user, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault(); // Preprečimo privzeto obnašanje povezave
    logout();
   // navigate('/login'); // Preusmeritev na stran za prijavo
  };

    return (
      <>
 
        <h5>{language === 'sl' ? 'Uporabniške strani' : 'User pager'}</h5>
    
        <ul className="list-group">
          <li className="list-group-item">
          <Link to="{user/edit" 
            className="text-decoration-none text-dark">
              {texts[language].edit}
            </Link>
          </li>
          <li className="list-group-item">
          <Link to="/user/addresses" className="text-decoration-none text-dark">
              {texts[language].address}
            </Link>
          </li>
          <li className="list-group-item">
          <Link to="/user/change-password" className="text-decoration-none text-dark">
              {texts[language].change_pass}
            </Link>
          </li>
          <li className="list-group-item libreak"><span></span></li>
          <li className="list-group-item">
          <Link to="/user/orders" className="text-decoration-none text-dark">
              {texts[language].orders}
            </Link>
          </li>
          <li className="list-group-item libreak"><span></span></li>
          <li className="list-group-item">
          <a
                href="/logout"
                onClick={handleLogout}
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                Logout
              </a>
          </li>
      
        </ul>

      </>
    );
  };
  
  /*
  UserPages.propTypes = {
    language: PropTypes.string.isRequired, // language mora biti string
    currentUser:PropTypes.string.isRequired, 
  };*/
  export default UserSidebarNavigation;


  /*
<button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>

  */