import { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './user.styles.scss';

import { LanguageContext } from '../../context/language-context/language-context.jsx';
import { AuthContext } from '../../context/auth-context/auth-context.utils';
//import { LanguageContext, LanguageProvider } from './context/language-context/language-context.jsx';
// const { language } = useContext(LanguageContext);


import LoginPage from './user-login/user-login.component';
import ForgotPassword  from './user-forgot-pass/user-forgot-pass.component';
import RegisterUser from './user-register/user-register.component';
import UserPages from './user-pages/user-pages.components';









// const UserPage = (language) => {
const UserPage = () => {
   const { language } = useContext(LanguageContext);
    const { user, logout } = useContext(AuthContext);


   //  console.log("UserPage:Language prop:", language);
   const userLoggedIn = user ? user : false; 
   // const { t } = useTranslation();
   const location = useLocation(); // Pridobite trenutni URL
    // <Route path="/" element={<Navigate to="/login" state={{ from: location }} />} />


    return(
    <>
        <div><h1>User pages</h1></div>
        <p>Uporabnik: {user}!</p>
        <p>Je logiran? {userLoggedIn ? "true" : "false"}!</p>
        {
        !userLoggedIn ?  
            (        
                <Routes basename="/">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterUser />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/user/login" />} /> 
                 </Routes>

            ) 
            : 
            (    
                <Routes>
                    <Route path="*" element={<UserPages language={language} />} />
                </Routes>
            )
      }
       
   

    </>);
}
   

/*

 {
            userLoggedIn ?         
            (        
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterUser />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/login" />} /> 
                    </Routes>

                ) 
                 : 
                 (    
                     <Routes>
                         <Route path="*" element={<UserPages language={language} />} />
                     </Routes>
                   )
             }
 {
        // <Route path="login" element={<EditUser language={language} />} />
        userLoggedIn ? 
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterUser language={language} />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
            </Routes>
        :
            <UserPages language={language} />
        
    }

<Route path="/login" element={<UserPage language={language} />} />
<Route path="/register" element={<UserPage language={language} />} />
<Route path="/forgot-password" element={<UserPage language={language} />} />
<Route path="/user/*" element={<UserPage language={language} />} />
<Route path="/user-pages/*" element={<UserPage language={language} />} />
*/

UserPage.propTypes = {
    language: PropTypes.string.isRequired, // language mora biti string
};

export default UserPage;

