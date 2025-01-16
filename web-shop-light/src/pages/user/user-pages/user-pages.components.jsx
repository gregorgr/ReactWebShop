// import React from 'react';
import  {useContext, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserSidebarNavigation from '../../../navigation/user-sidebar-navigation/user-sidebar-navigation.component'; 
//  '../../navigation/user-sidebar-navigation/user-sidebar-navigation.component.jsx'; // './user-sidebar.component.jsx';
import { LanguageContext } from '../../../context/language-context/language-context'; 
import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { useTranslation } from 'react-i18next';

//'../../context/language-context';

import Orders from '../../../components/user/orders/orders.component';

import UserEdit from '../../../components/user/user-edit/user-edit.component';
import UserChangePassword from '../../../components/user/user-change-password/user-change-password.component';
import UserAddresses  from '../../../components/user/user-addresses/user-addresses.component';

import ProtectedRoute from '../../../components/protected-route/protected-route.component';
import "./user-pages.styles.scss";

const UserPages = () => {

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
  const { language } = useContext(LanguageContext);
  const { user, logout } = useAuth();
  

  console.log(`Userpage: user ${user}!`)

  //console.log("UserPages:Language prop:", language);
  return (
    <>

    <div className="col-sm-2 sidenav">
            {/* Stranska vrstica */}
            <UserSidebarNavigation language={language}  />

    </div>

    
    <div className="col-sm-8 text-left product-list"> 
  
      
        <Routes>
            <Route path="edit" element={<ProtectedRoute><UserEdit language={language} /></ProtectedRoute>} />
            <Route path="addresses" element={<ProtectedRoute><UserAddresses language={language} username={user}/></ProtectedRoute>} />
            <Route path="change-password" element={<ProtectedRoute><UserChangePassword language={language} username={user}/></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders language={language} username={user}/></ProtectedRoute>} />
          </Routes>
        </div>
    </>
  );
};

// import PropTypes from 'prop-types';
UserPages.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
 // currentUser:PropTypes.string.isRequired, 
};

export default UserPages;

/*

*/

//Loading module from “http://localhost:5173/src/pages/user-pages/user.component.jsx?t=1734952791654” was blocked because of a disallowed MIME type (“”).