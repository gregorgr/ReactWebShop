// import React from 'react';
import  {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserSidebarNavigation from '../../../navigation/user-sidebar-navigation/user-sidebar-navigation.component'; 
//  '../../navigation/user-sidebar-navigation/user-sidebar-navigation.component.jsx'; // './user-sidebar.component.jsx';
import { LanguageContext } from '../../../context/language-context/language-context'; 
//'../../context/language-context';

import Orders from '../../../components/user/orders/orders.component';

import EditUser from '../../../components/user/edit-user/edit-user.component';
import ChangePassword from '../../../components/user/user-change-password/user-change-password.component';
import UserAddresses  from '../../../components/user/user-addresses/user-addresses.component';




const UserPages = () => {
  const { language } = useContext(LanguageContext);
  //console.log("UserPages:Language prop:", language);
  return (
    <>

    <div className="col-sm-2 sidenav">
            {/* Stranska vrstica */}
            <UserSidebarNavigation language={language} />

    </div>

    
    <div className="col-sm-8 text-left product-list"> 
        <h1>UserPage</h1>
        <h2>{language === 'sl' ? 'Stran uporabnika' : 'User Page'}</h2>
        <Routes>
            <Route path="edit" element={<EditUser language={language} />} />
            <Route path="addresses" element={<UserAddresses language={language} />} />
            <Route path="change-password" element={<ChangePassword language={language} />} />
            <Route path="orders" element={<Orders language={language} />} />
          </Routes>
        </div>
    </>
  );
};

// import PropTypes from 'prop-types';
UserPages.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
};

export default UserPages;

/*

*/

//Loading module from “http://localhost:5173/src/pages/user-pages/user.component.jsx?t=1734952791654” was blocked because of a disallowed MIME type (“”).