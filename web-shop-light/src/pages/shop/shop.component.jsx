import  { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import React from 'react';
import PropTypes from 'prop-types';
import './shop.styles.scss';


import ListedProduct from './listed-product/listed-product.component.jsx';

import { products } from '../../services/products/products.component.jsx'; // As
import {categories} from '../../services/categories/categories.component.jsx';


//const getRandomStars = () => Math.floor(Math.random() * 5) + 1;

const Shop = ({ language}) => {
 // const { category, page } = useParams(); 
  const { category, page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;
  const productsPerPage = 9; // koliko izdelkov na stran
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState('');
  const texts = {
    en: { title: 'Welcome to the Shop', message: 'Browse our products!', cat: 'Product Categories' },
    sl: { title: 'Dobrodošli v trgovini', message: 'Prebrskajte naše izdelke!' , cat: 'Kategorije izdelkov'},
  };

  //const filteredProducts = category
  // ? products.filter((product) => product.category === category)
  //: products;
   // Filter products if a category is specified
   const filteredProducts = useMemo(() => {
    return category
      ? products.filter((product) => product.category === category)
      : products;
  }, [category]);

    // Izračun indeksa izdelkov
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
   
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  

  const sortLabels = [
    {
      value: '',
      label: {
        sl: 'Brez sortiranja',
        en: 'No sorting',
      },
      icon: null
    },
    {
      value: 'alphabetical-asc',
      label: {
        sl: 'Ime (A-Z)',
        en: 'Name (A-Z)',
      },
      icon: 'fa fa-sort-alpha-down'
    },
    {
      value: 'alphabetical-desc',
      label: {
        sl: 'Ime (Z-A)',
        en: 'Name (Z-A)',
      },
      icon: 'fa fa-sort-alpha-up'
    },
    {
      value: 'price-asc',
      label: {
        sl: 'Cena (najnižja najprej)',
        en: 'Price (lowest first)',
      },
      icon: 'fa fa-sort-amount-down'
    },
    {
      value: 'price-desc',
      label: {
        sl: 'Cena (najvišja najprej)',
        en: 'Price (highest first)',
      },
      icon: 'fa fa-sort-amount-up'
    },
    {
      value: 'rating-asc',
      label: {
        sl: 'Ocena (najnižja najprej)',
        en: 'Rating (lowest first)',
      },
      icon: 'fa fa-sort-numeric-down'
    },
    {
      value: 'rating-desc',
      label: {
        sl: 'Ocena (najvišja najprej)',
        en: 'Rating (highest first)',
      },
      icon: 'fa fa-sort-numeric-up'
    },
  ];
  

  // Helper function to parse European-formatted price strings like "2.300,00€" into numbers.
  const parsePrice = (priceStr) => {
    // Remove the currency symbol
    const numberStr = priceStr.replace('€', '').trim();
    // Replace '.' with '' (thousand separator) and ',' with '.' for decimal
    const normalizedStr = numberStr.replace('.', '').replace(',', '.');
    return parseFloat(normalizedStr);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
    // Sort the products based on the selected option
 // Sort the products based on the selected option
 const sortedProducts = useMemo(() => {
  let sorted = [...filteredProducts];

  switch (sortOption) {
    case 'alphabetical-asc':
      sorted.sort((a, b) => {
        const categoryA = a.translations?.[language]?.category || a.category;
        const categoryB = b.translations?.[language]?.category || b.category;
        return categoryA.localeCompare(categoryB);
      });
      break;

    case 'alphabetical-desc':
      sorted.sort((a, b) => {
        const categoryA = a.translations?.[language]?.category || a.category;
        const categoryB = b.translations?.[language]?.category || b.category;
        return categoryB.localeCompare(categoryA);
      });
      break;

    case 'price-asc':
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      break;

    case 'price-desc':
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      break;

    case 'rating-asc':
      sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      break;

    case 'rating-desc':
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;

    default:
      // No sorting
      break;
  }

  return sorted;
}, [filteredProducts, sortOption, language]);

const currentProducts = sortedProducts.slice(startIndex, endIndex);

const handlePageChange = (newPage) => {
  if (category) {
    navigate(`/shop/${category}/page/${newPage}`);
  } else {
    navigate(`/shop/page/${newPage}`);
  }
};

  return (
  <>


    <div className="col-sm-2 sidenav">
      <h3>{texts[language].cat}</h3>
      <ul className="list-group">
        <li className="list-group-item"> <a href={`/shop/`} className="text-decoration-none text-dark">
              {language === 'sl' ? "Vse" : "All"}
              </a>
         </li>
        { 
         // <li>{category}</li>
        }
        {categories.map((cat) => {
         const categoryName = language === 'sl' ? cat.category : cat.translations.en.category;
         const  isSelected = cat.category == category;
         return (
          <li key={cat.id} className="list-group-item">
            {isSelected ? (
              <span className="selected-category">{categoryName}</span>
             ) : (
              <a href={`/shop/${categoryName}`} className="text-decoration-none text-dark">
                {categoryName}
              </a>
            )}
          </li>
        );
        })}
      </ul>
  </div>

  <div className="col-sm-8 text-left product-list"> 

      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>

      <div className="ccontainer-fluid p-0">
      <div className="row mb-3 gx-0">
        <div className="col-12 d-flex justify-content-end">
          <select className="form-select w-auto" value={sortOption} onChange={handleSortChange}>
          {sortLabels.map(({ value, label, icon }) => (
                <option key={value} value={value}>
                  {label[language]}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="row gx-0 gy-3">

      {currentProducts.map((product) => (
          <div className="col-md-3 " key={product.id}>
            <ListedProduct product={product} language={language} />
          </div>
        ))}

      </div>
     {/* Pager */}
     <div className="row gx-0 gy-3">
        <div className="col-12 d-flex justify-content-center">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <li key={pg} className={`page-item ${pg === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pg)}>
                    {pg}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      </div> 


    </div>



</>
  );
};

Shop.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
// setL
/*
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
  ).isRequired,*/

};

export default Shop;