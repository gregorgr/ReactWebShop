import React, { useState } from 'react';
//import { createContext, useState, useContext } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // See setup below
import { LanguageProvider } from './context/language-context/language-context.jsx';
import { AuthProvider } from './context/auth-context/auth-context.utils.jsx';
// import { UserProvider } from './context/user/user.context.jsx';

import PageHeader from './components/page-header/header.component.jsx';
import PageFooter from './components/page-footer/footer.component.jsx';

// pages
import Home from './pages/home-page/home-page.component';
import Shop from './pages/shop/shop.component';
import ShopProduct from './components/shop-product/shop-product.component.jsx';
//import Product from './pages/shop/product/product.component';
import Cart from './pages/cart/cart.component.jsx';
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
import { ProductsProvider } from './context/products/products.context.jsx';
//import Cart from './context/cart-context/cart-context.component';

import './App.scss';


function App() {
  const { t } = useTranslation();
  //const [language, setLanguage] = useState('en'); // Dvojezična podpora
  const { i18n } = useTranslation(); // Pridobimo objekt i18n
  const currentLanguage = i18n.language; // Trenutni jezik



  return (
    <>
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>
  
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
                      {/* Gumb za preskok na vsebino */}
              <a href="#main-content" className="skip-to-content">
                {t("page.skiptocontent")}
              </a>
                <PageHeader language={currentLanguage}  />
                <main id="main-content">
                <div className="">    
                  <div className="row content-wrapper clearfix">
                    <Routes>
                      <Route path="/" element={<Home language={currentLanguage}  />} />
                      <Route path="/shop" element={<Shop language={currentLanguage}  />} />
                      <Route path="/shop/:category" element={<Shop language={currentLanguage}  />} />
                      <Route path="/shop" element={<Shop language={currentLanguage} />} />
                      <Route path="/shop/page/:page" element={<Shop language={currentLanguage}  />} />
                      <Route path="/shop/:category" element={<Shop language={currentLanguage}  />} />
                      <Route path="/shop/:category/page/:page" element={<Shop language={currentLanguage}  />} />
                      <Route path="/shop/:category/product/:productId" element={<ShopProduct language={currentLanguage} />} />
                      <Route path="/shop/brand/:brand/:page" element={<Shop language={currentLanguage}  />} />
                      <Route path="/cart" element={<Cart language={currentLanguage} />} />
                      <Route path="/stores" element={<StoresPage language={currentLanguage} />} />
                      <Route path="/contact" element={<Contact language={currentLanguage}/>} />
                      {/* Strani za prijavo */}
                  
                    {
                        //<Route path="/login/*" element={<UserPage language={language.language || language} />} />
                      //  <Route path="/register" element={<UserPage language={language.language || language}/>} />
                      //<Route path="/forgot-password" element={<UserPage language={language.language || language} />} />
                      // <Route path="/orders" element={<Orders language={language} />} />
                    } 
                      {/* Zaščitene strani uporabnika */}
                      <Route path="/user/*" element={<UserPage language={currentLanguage.language || currentLanguage} />} /> 
                    </Routes>
                  </div>
                </div>
                </main>
                <PageFooter />
            </CartProvider>
            </ProductsProvider>
        </AuthProvider>
        
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
