import  { useState, useMemo, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import React from 'react';
import PropTypes from 'prop-types';

import sortLabels  from './shop.translations.jsx';
import './shop.styles.scss';

import ShopSidebarList from '../../components/shop/shop-sidebar-list/shop-sidebar-list.component.jsx';

import ListedProduct from "../../components/shop/listed-product/listed-product.component.jsx";


import {categories} from '../../services/categories/categories.component.jsx';

import { ProductContext } from '../../context/products/products.context.jsx';
import { fetchProducts } from '../../services/apiService.js';
// import { products } from '../../services/product/products.component.jsx'; // As


//const getRandomStars = () => Math.floor(Math.random() * 5) + 1;

const ShopPage = ({ language}) => {
 // const { category, page } = useParams(); 
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
  const { category: rawCategory, page } = useParams();
  const { products: staticProducts } = useContext(ProductContext);
  const [products, setProducts] = useState(staticProducts);

  const category = rawCategory ? decodeURIComponent(rawCategory) : null;

  const { brand: rawBrand, bpage } = useParams();
  const brand = rawBrand ? decodeURIComponent(rawBrand) : null;

  const currentPage = page ? parseInt(page, 10) : 1;
  const productsPerPage = 9; // koliko izdelkov na stran
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');


  useEffect(() => {
    const loadProducts = async () => {
      try {
       // setIsLoading(true);
        const xtoken = null;
        const productsData = await fetchProducts(currentLanguage, xtoken);
        console.log("ShopPage:loadProducts: productData: ",productsData);
        const merged= mergeProductStorage(products, productsData);
        console.log("ShopPage:loadProducts: merged: ",merged);
        setProducts(merged); // Posodobimo stanje s pridobljenimi produkti

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentLanguage]);


  //const filteredProducts = category
  // ? products.filter((product) => product.category === category)
  //: products;
   // Filter products if a category is specified
  const filteredProducts1 = useMemo(() => {
    return category
      ? products.filter((product) => product.category === category)
      : products;
  }, [category]);

  const filteredProducts = useMemo(() => {
    return category
      ? products.filter((product) => {
          const productCategory = language === 'sl' ? product.category : product.translations.en.category;
          return productCategory === category;
        })
      : products;
  }, [category, language]);

  products.reduce((acc, product) => {
    const producer = product.producer;
    if (!acc[producer]) {
      acc[producer] = 0;
    }
    acc[producer]++;
    return acc;
  }, {})

  const brandsCount = filteredProducts.reduce((acc, product) => {
    const producer = product.producer; // Pridobimo znamko izdelka
    if (!acc[producer]) {
      acc[producer] = 0; // Če znamka še ne obstaja v `acc`, jo inicializiramo
    }
    acc[producer]++; // Povečamo števec za znamko
    return acc;
  }, {});

    // Izračun indeksa izdelkov
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
   
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    const brandList = Object.entries(brandsCount).map(([producer, count]) => (
      <li key={producer} className="list-group-item">
        <a
          href={`/shop/brand/${encodeURIComponent(producer.toLowerCase())}`}
          className="text-decoration-none text-dark"
        >
          {producer} ({count})
        </a>
      </li>
    ));


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
      sorted.sort((a, b) => a.price - b.price);
      break;

    case 'price-desc':
      // sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      sorted.sort((a, b) => b.price - a.price);
      break;
//      "averageRating": 5,"numberOfReviews": 3, 
    case 'rating-asc':
      sorted.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
      break;

    case 'rating-desc':
      sorted.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
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

const getCategoryArray = (categories, products, language, rootUrl, selectedCategory = null) => {
  // Mapiramo kategorije in preštejemo število izdelkov v vsaki
  return categories.map((cat) => {
    // Določimo ime kategorije na podlagi jezika
    const categoryName = language === 'sl' ? cat.category : cat.translations.en.category;

    // Preštejemo izdelke v kategoriji
    const countCatElements = products.filter((product) => {
      const productCategory = language === 'sl' ? product.category : product.translations?.en?.category;
      return productCategory === categoryName;
    }).length;

    // Sestavimo URL za kategorijo: 
    const url = `${rootUrl}${encodeURIComponent(categoryName)}`;

    // Vrni objekt s podatki o kategoriji
    return {
      id: cat.id,
      name: categoryName,
      count: countCatElements,
      url,
      isSelected: selectedCategory === categoryName, // Ali je kategorija izbrana
    };
  });
};

const mergeProductsFull = (products, productsData) => {
  const productMap = new Map(products.map((product) => [product.id, product]));

  productsData.forEach((newProduct) => {
    if (productMap.has(newProduct.id)) {
      const existingProduct = productMap.get(newProduct.id);
      productMap.set(newProduct.id, { ...existingProduct, ...newProduct });
    } else {
      productMap.set(newProduct.id, newProduct);
    }
  });

  return Array.from(productMap.values());
};

const mergeProductStorage = (products, productsData) => {
  const productMap = new Map(products.map((product) => [product.id, product]));

  productsData.forEach((newProduct) => {
    if (productMap.has(newProduct.id)) {
      const existingProduct = productMap.get(newProduct.id);
      productMap.set(newProduct.id, { ...existingProduct, itemStorage: newProduct.itemStorage });
      productMap.set(newProduct.id, { ...existingProduct, item_stock: newProduct.itemStorage });

    }
  });

  return Array.from(productMap.values());
};


// container-fluid main-content shop-content
//  col-sm-2 
  return (
  <>

<div className="container mt-3">
  <div className="row">
    <div className="col-3  p-3 sidenav">

   
      <ShopSidebarList 
        titleRef={"shop.cat"} 
        url={"/shop/"} 
        items={ getCategoryArray(
                      categories, 
                      products, 
                      language, 
                      "/shop/", 
                      category)} />
    
   
      <div className="brands-section">
        <h5>{t("shop.brands")}</h5>
        <ul className="list-group">{brandList}
    {
 
    }
    { /* /
    products
      .reduce((acc, product) => {
        // Preštejemo število izdelkov za vsako znamko
        const producer = product.producer;
        if (!acc[producer]) {
          acc[producer] = 0;
        }
        acc[producer]++;
        return acc;
      }, {})
      .map(([producer, count]) => (
        <li key={producer} className="list-group-item">
          <a
            href={`/shop/brand/${encodeURIComponent(producer)}`}
            className="text-decoration-none text-dark"
          >
            {producer} ({count})
          </a>
        </li>
      ))
        */}
      
  </ul>
</div>
  </div>

{
  // col-sm-8 text-left product-list
}
  <div className="col-7 p-3"> 

      <h2>{t("shop.title")}</h2>
      <p>{t("shop.message")}</p>

      <div className="ccontainer-fluid p-0">
      <div className="title-row">
        <div className="row mb-3 gx-0">
          <div className="col-11 d-flex justify-content-end">
            
          </div>
          <div className="col-11 d-flex justify-content-end">
            <select className="form-select w-auto" value={sortOption} onChange={handleSortChange}>
            {sortLabels.map(({ value, label, icon }) => (
                  <option key={value} value={value}>
                    {label[language]}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="">
      <div className="row g-0">
       
        {currentProducts.map((product) => (
            <div className="col-md-3" key={product.id}>
              <ListedProduct product={product} language={language} />
            </div>
          ))}
      </div>    
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

    </div>
    </div>
</>
  );
};

ShopPage.propTypes = {
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

export default ShopPage;