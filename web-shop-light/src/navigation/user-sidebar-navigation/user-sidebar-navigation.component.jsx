import { Link } from 'react-router-dom';

import './user-sidebar-navigation.styles.scss';

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


const UserSidebarNavigation = ({ language = 'sl' }) => {
    return (
      <>
 
        <h5>{language === 'sl' ? 'Uporabniške strani' : 'User pager'}</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <a href={`/user/edit`} className="text-decoration-none text-dark">
              {texts[language].edit}
            </a>
          </li>
          <li className="list-group-item">
            <a href={`/user/addresses`} className="text-decoration-none text-dark">
              {texts[language].address}
            </a>
          </li>
          <li className="list-group-item">
            <a href={`/user/change-password`} className="text-decoration-none text-dark">
              {texts[language].change_pass}
            </a>
          </li>
          <li className="list-group-item libreak"><span></span></li>
          <li className="list-group-item">
            <a href={`/user/orders`} className="text-decoration-none text-dark">
              {texts[language].orders}
            </a>
          </li>
        </ul>

      </>
    );
  };
  
  export default UserSidebarNavigation;