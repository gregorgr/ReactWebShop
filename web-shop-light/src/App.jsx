import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header/header.component';

// pages
import Home from './pages/home-page/home-page.component';
import Shop from './pages/shop/shop.component';
import Product from './pages/shop/product/product.component';
import Chart from './pages/shop/chart/chart.component';
import Stores from './pages/stores/stores.component';
import Contact from './pages/contact/contact.component';

import User from './pages/user/user.component';
import Orders from './pages/shop/orders/orders.component';
import RegisterUser from './pages/user/user-register/user-register.component';
import ChangePassword from './pages/user/user-change-password/user-change-password.component';
import ForgotPassword from './pages/user/user-forgot-pass/user-forgot-pass.component';

import './App.css';


function App() {

  const [language, setLanguage] = useState('en'); // Dvojezična podpora


  const categories1 = [
    {
      id: 1,
      category: 'Električne kitare',
      image: '/src/img/products/elektricna-fender.jpg',
      description: 'Električne kitare za vse stile igranja.',
    },
    {
      id: 2,
      category: 'Akustične kitare',
      image: '/src/img/products/akusticna-martin.jpg',
      description: 'Akustične kitare z jasnim zvokom in vrhunsko izdelavo.',
    },
    {
      id: 3,
      category: 'Klasične kitare',
      image: '/src/img/products/akusticna-martin.jpg',
      description: 'Klasične kitare z najlonskimi strunami za začetnike in profesionalce.',
    },
    {
      id: 4,
      category: 'Ukulele',
      image: '/src/img/products/ukulele-martin.jpg',
      description: 'Ukulele za zabavo in sprostitev.',
    },
    {
      id: 5,
      category: 'Jazz kitare',
      image: '/src/img/products/jazz-epiphone.jpg',
      description: 'Jazz kitare za sofisticirane igralce.',
    }];

    const categories = [
      {
        id: 1,
        category: 'Električne kitare',
        image: '/src/img/products/elektricna-fender.jpg',
        description: 'Električne kitare za vse stile igranja.',
        price: '2.300,00€',
        translations: {
          en: {
            category: 'Electric Guitars',
            description: 'Electric guitars for all playing styles.',
          },
        },
      },
      {
        id: 2,
        category: 'Akustične kitare',
        image: '/src/img/products/akusticna-martin.jpg',
        description: 'Akustične kitare z jasnim zvokom in vrhunsko izdelavo.',
        price: '450,00€',
        translations: {
          en: {
            category: 'Acoustic Guitars',
            description: 'Acoustic guitars with clear sound and top-notch craftsmanship.',
          },
        },
      },
      {
        id: 3,
        category: 'Klasične kitare',
        image: '/src/img/products/akusticna-martin.jpg',
        description: 'Klasične kitare z najlonskimi strunami za začetnike in profesionalce.',
        price: '2.800,00€',
        translations: {
          en: {
            category: 'Classical Guitars',
            description: 'Classical guitars with nylon strings for beginners and professionals.',
          },
        },
      },
      {
        id: 4,
        category: 'Ukulele',
        image: '/src/img/products/ukulele-martin.jpg',
        description: 'Ukulele za zabavo in sprostitev.',
        price: '300,00€',
        translations: {
          en: {
            category: 'Ukulele',
            description: 'Ukulele for fun and relaxation.',
          },
        },
      },
      {
        id: 5,
        category: 'Jazz kitare',
        image: '/src/img/products/jazz-epiphone.jpg',
        description: 'Jazz kitare za sofisticirane igralce.',
        price: '99,00€',
        translations: {
          en: {
            category: 'Jazz Guitars',
            description: 'Jazz guitars for sophisticated players.',
          },
        },
      },
    ];
    

  return (
    <>
    <Router>
      <Header language={language} setLanguage={setLanguage} />
      <div class="container-fluid text-center">    
          <div class="row content">
          <Routes>
            <Route path="/" element={<Home language={language} setLanguage={setLanguage} categories={categories}/>} />
            <Route path="/shop" element={<Shop language={language}  categories={categories}/>} />
            <Route path="/chart" element={<Chart language={language} />} />
            <Route path="/stores" element={<Stores language={language} />} />
            <Route path="/contact" element={<Contact language={language}/>} />
            <Route path="/user" element={<User language={language} />} />
            <Route path="/register" element={<RegisterUser language={language} />} />
            <Route path="/change-password" element={<ChangePassword language={language} />} />
            <Route path="/forgot-password" element={<ForgotPassword language={language} />} />
            <Route path="/orders" element={<Orders language={language} />} />
          </Routes>
        
        </div>
    </div>
    </Router>
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
