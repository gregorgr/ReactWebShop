import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductContext } from "../../context/products/products.context.jsx";

import './shop-product.styles.scss';
import StarRating from "../../components/star-rating/star-rating.component.jsx";


const ShopProductSS = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation(); // Pridobimo objekt i18n
  const currentLanguage = i18n.language; // Trenutni jezik
  const { productId } = useParams();
  const { products } = useContext(ProductContext);

  // Poiščite produkt glede na ID
  const product = products.find((item) => item.id === parseInt(productId));

  if (!product) {
    return <p>Product not found</p>;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value).replace('€', ''); // Odstranimo simbol €, če je potreben samo znesek
  };

  const {
    id,
    title,
    description,
    category,
    longDescription,
    image,
    price,
    averageRating,
    numberOfReviews,
    translations,
    itemStorage,
    producer,
    original_product_url
  } = product;

  const NewWindowLink = ({url, linkText, ...props}) => {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
        {linkText}
      </a>
    );
  };

  // Prevajanje
  const translatedTitle = translations?.[currentLanguage]?.title || title;
  const translatedDescription = translations?.[currentLanguage]?.description || description;
  const translatedLongDescription = translations?.[currentLanguage]?.longDescription || longDescription;

  return (
    <div className="container">

         {/* Header */}
  <div className="row my-4 product-header">
    <div className="col">
      <span className="h3">{title}</span>
      <span className="h3 text-muted">&nbsp;|&nbsp;</span>
      <span className="h4 text-muted">{category}</span>
    </div>
  </div>

  {/* Product Section */}
  <div className="row">
    <div className="col-md-6">
      <div className="ratio ratio-1x1">
        <img src={image} alt={title} title={translatedTitle} className="img-fluid" />

      </div>
    </div>
    <div className="col-md-5 offset-md-1">
      <h2 className="mb-3">{title}</h2>
      <p className="h3 text-muted">{formatCurrency(price)}€</p>
      <hr />
      <div className="my-3">
       <StarRating averageRating={averageRating} />
        &nbsp; &nbsp;
        <strong>{numberOfReviews} Reviews</strong>
        &nbsp; &nbsp;
        <a href="#">Show all</a>
      </div>
      <p>
        {translatedDescription}
      </p>
      <div className="my-3">
        <button className="btn btn-primary mt-3 tooltip"
         data-tooltip="Add this product to your cart"
        >Add to cart</button>
      </div>
      <table className="table table-borderless mt-4">
        <tbody>
          <tr>
            <td className="text-end fw-bold">Item ID:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Proizvajalec:</td>
            <td> 
                <NewWindowLink 
              url={original_product_url}
              linkText={producer} 
              title="to original product page"
              className="custom-class" />
            
        
                
                
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Added:</td>
            <td>3 days ago</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Views:</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Tabs */}
  <div className="row mt-5">
    <div className="col">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Overview
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Details
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Reviews
          </a>
        </li>
  
      </ul>
      <div className="mt-3">
        <p>
        {translatedLongDescription}
        </p>
        <p>Rating:  {averageRating} ({numberOfReviews} reviews)</p>
      </div>
    </div>
  </div>

    </div>
  );
};

export default ShopProduct;
