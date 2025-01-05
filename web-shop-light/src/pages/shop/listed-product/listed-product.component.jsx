//import React from 'react';
//import { useState } from 'react';
import  { useContext }  from 'react';
import { Link } from 'react-router-dom';
//import { CartContext } from '../../../context/cart-context/cart-context.provider';



import { useDispatch } from 'react-redux';
import { addItem } from '../../../features/cart/cartSlice';
// import React from 'react';
import PropTypes from 'prop-types';
import './listed-product.styles.scss';

function ListedProduct({ product, language }) {

  //const { addItemToCart } = useContext(CartContext);
  const languageToUse = language || 'en'; 
  const translatedCategory = product.translations?.[language]?.category || product.category;
  const translatedProductTitle = product.translations?.[language]?.title || product.title;

  const dispatch = useDispatch();

  const VAT_RATE = 0.22; // DDV (20%)


  /*
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prepreči preusmeritev strani
    console.log(product.id);
    console.log({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    addItemToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // Začetna količina
    });
  };
*/

  /*
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // Začetna količina
  */

 const handleAddToCart = () => {
        dispatch(addItem({ 
          id: product.id, 
          name: translatedProductTitle, 
          price: product.price, 
          quantity: 1,
          vat_rate: product.vat_rate,
          item_stock: product.item_stock,
          image: product.image }));
 };

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
              {
                // add to cart BUTTON
              }
              <Link className="btn btn-success text-white mt-2" 
                    to="#"
                    onClick={handleAddToCart}
                >
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
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        producer: PropTypes.string,
        original_product_url: PropTypes.string,
        vat_rate: PropTypes.number.isRequired,
        item_stock: PropTypes.number.isRequired,
        translations: PropTypes.objectOf(
          PropTypes.shape({
            category: PropTypes.string,
            title:PropTypes.string,
            description: PropTypes.string,
            longDescription:PropTypes.string

          })
        )
      }).isRequired,

    language: PropTypes.string.isRequired, 
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
    ).isRequired,
    */
  
  };

export default ListedProduct;
