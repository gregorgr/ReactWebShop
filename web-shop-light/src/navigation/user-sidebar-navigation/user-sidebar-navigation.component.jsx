import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './user-sidebar-navigation.styles.scss';

import { AuthContext } from '../../context/auth-context/auth-context.utils';
//import { LanguageContext } from '../../../context/language-context/language-context'; 
// const { language } = useContext(LanguageContext);
import { useTranslation } from 'react-i18next';



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
const UserSidebarNavigation = ({}) => {
  
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = (e) => {
    e.preventDefault(); // Preprečimo privzeto obnašanje povezave
    logout();
   // navigate('/login'); // Preusmeritev na stran za prijavo
  };

    return (
      <>
 
        <h5>{t("user.sidebarTitle")}</h5>
    
        <ul className="list-group">
          <li className="list-group-item">
          <Link to="/user/edit" 
            className="text-decoration-none text-dark">
             {t("user.edit")}
            </Link>
          </li>
          <li className="list-group-item">
          <Link to="/user/addresses" className="text-decoration-none text-dark">
             {t("user.address")}
            </Link>
          </li>
          <li className="list-group-item">
          <Link to="/user/change-password" className="text-decoration-none text-dark">
              {t("user.change_pass")}
            </Link>
          </li>
          <li className="list-group-item libreak"><span></span></li>
          <li className="list-group-item">
          <Link to="/user/orders" className="text-decoration-none text-dark">
              {t("user.orders")}
            </Link>
          </li>
          <li className="list-group-item libreak"><span></span></li>
          <li className="list-group-item">
          <a
                href="/logout"
                onClick={handleLogout}
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                {t("login.logout")}
              </a>
          </li>
      
        </ul>

      </>
    );
  };
  
  /*
  
  UserSidebarNavigation.propTypes = {
   // language: PropTypes.string.isRequired, // language mora biti string
    //currentUser:PropTypes.string.isRequired, 
  }*/
  export default UserSidebarNavigation;


  /*
<button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>

  */