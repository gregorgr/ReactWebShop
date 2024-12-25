//import React from 'react';
//import { useState } from 'react';
import { Link } from 'react-router-dom';

// import React from 'react';
import PropTypes from 'prop-types';
import './listed-product.styles.scss';

function ListedProduct({ product, language }) {
  const translatedCategory = product.translations?.[language]?.category || product.category;
  //const translatedDescription = product.translations?.[language]?.description || product.description;
  const translatedProductTitle = product.translations?.[language]?.title || product.title;
  return (
    <div className="card  product-wap rounded-0">
      <div className="card rounded-0">
        <img 
          className="card-img rounded-0 img-fluid" 
          src={product.image} 
          alt={translatedCategory} 
        />
        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
          <ul className="list-unstyled">
            <li>
              <Link className="btn btn-success text-white" to={`/shop/${product.category}/${product.id}`}>
                <i className="far fa-heart"></i>
              </Link>
            </li>
            <li>
              <Link className="btn btn-success text-white mt-2" to={`/shop/${product.category}/${product.id}`}>
                <i className="far fa-eye"></i>
              </Link>
            </li>
            <li>
              <Link className="btn btn-success text-white mt-2" to={`/shop/${product.category}/${product.id}`}>
                <i className="fas fa-cart-plus"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
      <h2><Link to={`/shop/${product.category}/${product.id}`} className="h3 text-decoration-none">
          {translatedProductTitle}
        </Link></h2>
        <br />
        <Link to={`/shop/${product.category}`} className="h3 text-decoration-none">
          {translatedCategory}
        </Link>
        <ul className="list-unstyled d-flex justify-content-center mb-1">
          <li>
            <i className="text-warning fa fa-star"></i>
            <i className="text-warning fa fa-star"></i>
            <i className="text-warning fa fa-star"></i>
            <i className="text-muted fa fa-star"></i>
            <i className="text-muted fa fa-star"></i>
          </li>
        </ul>
        <p className="text-center mb-0">{product.price}</p>
      </div>
    </div>
  );
}


ListedProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        category_id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        producer: PropTypes.string,
        original_product_url: PropTypes.string,
        translations: PropTypes.objectOf(
          PropTypes.shape({
            category: PropTypes.string,
            description: PropTypes.string
          })
        )
      }).isRequired,

    language: PropTypes.string.isRequired, 

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

export default ListedProduct;
