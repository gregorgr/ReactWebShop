import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // See setup below
import { LanguageProvider } from './context/language-context/language-context.jsx';


import Header from './components/header/header.component';

// pages
import Home from './pages/home-page/home-page.component';
import Shop from './pages/shop/shop.component';
//import Product from './pages/shop/product/product.component';
import Cart from './pages/shop/cart/cart.component';
import StoresPage from './pages/stores-page/stores-page.component';
import Contact from './pages/contact/contact.component';

//import User from './components/user/edit-user/edit-user.component';
//
import UserPage from './pages/user/user.component';
//import UserPages from './pages/user-pages/user-pages.components';
import Orders from './pages/shop/orders/orders.component';
//import RegisterUser from './pages/user-register/user-register.component';
//import ChangePassword from './components/user/user-change-password/user-change-password.component';
//import ForgotPassword from './components/user/user-forgot-pass/user-forgot-pass.component';
/*import { themes } from './themes'; // Uvozimo zbirko tem
*/

import { CartProvider } from './context/cart-context/cart-context.provider';

//import Cart from './context/cart-context/cart-context.component';

import './App.scss';


function App() {

  const [language, setLanguage] = useState('en'); // Dvojezična podpora


//  <Route path="/user/change-password" element={<ChangePassword language={language} />} />


  return (
    <>
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>
        <CartProvider>
          <Router>
            <Header language={language} setLanguage={setLanguage} />
            <div className="container-fluid text-center main-content">    
              <div className="row content">
                <Routes>
                  <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
                  <Route path="/shop" element={<Shop language={language}  />} />
                  <Route path="/shop/:category" element={<Shop language={language}  />} />
                  <Route path="/shop" element={<Shop language={language} />} />
                  <Route path="/shop/page/:page" element={<Shop language={language}  />} />
                  <Route path="/shop/:category" element={<Shop language={language}  />} />
                  <Route path="/shop/:category/page/:page" element={<Shop language={language}  />} />
                  <Route path="/shop/brand/:brand/:page" element={<Shop language={language}  />} />
                  <Route path="/cart" element={<Cart language={language} />} />
                  <Route path="/stores" element={<StoresPage language={language} />} />
                  <Route path="/contact" element={<Contact language={language}/>} />
                  {/* Strani za prijavo */}
                  <Route path="/login/*" element={<UserPage language={language.language || language} />} />
                  <Route path="/register" element={<UserPage language={language.language || language}/>} />
                  <Route path="/forgot-password" element={<UserPage language={language.language || language} />} />
                  {/* Zaščitene strani uporabnika */}
                  <Route path="/user/*" element={<UserPage language={language.language || language} />} />


                  <Route path="/orders" element={<Orders language={language} />} />
                </Routes>
              </div>
            </div>
          </Router>
        </CartProvider>
      </I18nextProvider>
    </LanguageProvider>
    </>
  )
}

export default App;

/*
import PropTypes from 'prop-types';
Home.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
  setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};



      <Routes>



      </Routes>
*/


/*

<Home language={language} />
      <RegisterUser  language={language} />
      
<Route path="/language" element={<Language />} />

    <Router>
      <Header language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>



        <Home language={language} />
    <Shop language={language} />
    <Product language={language} />
    <Stores language={language} />
    <Contact language={language} />
    <hr></hr>
    <User language={language} />
    <Orders language={language} />
    <RegisterUser language={language} />
    <ChangePassword language={language} />
    <ForgotPassword language={language} />
*/
