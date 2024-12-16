import { useState } from 'react';

// import React from 'react';
import PropTypes from 'prop-types';
import './shop.styles.scss';

const getRandomStars = () => Math.floor(Math.random() * 5) + 1;

const Shop = ({ language,  categories }) => {
  const texts = {
    en: { title: 'Welcome to the Shop', message: 'Browse our products!', cat: 'Product Categories' },
    sl: { title: 'Dobrodošli v trgovini', message: 'Prebrskajte naše izdelke!' , cat: 'Kategorije izdelkov'},
  };

  return (
  <>


    <div className="col-sm-2 sidenav">
      <h3>{texts[language].cat}</h3>
      <ul className="list-group">
  
        {categories.map((category) => (
    
          <li key={category.id} className="list-group-item">
          <a href={`#${category.id}`} className="text-decoration-none text-dark">
              {language === 'sl' ? category.category : category.translations.en.category}
                      </a>
            </li>
   
        ))}
      </ul>
  </div>
  <div className="col-sm-8 text-left"> 

      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>

      <div className="container mt-5">
      <div className="row">
 
      </div> 
      </div>


    </div>



</>
  );
};

Shop.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
// setL
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      translations: PropTypes.shape({
        en: PropTypes.shape({
          category: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,

};

export default Shop;