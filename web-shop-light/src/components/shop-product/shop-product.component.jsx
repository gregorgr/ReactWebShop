import { useParams } from "react-router-dom";
import { useContext } from "react";
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductContext } from "../../context/products/products.context.jsx";
import { useDispatch } from 'react-redux';
import './shop-product.styles.scss';
import StarRating from "../star-rating/star-rating.component.jsx";
import { addItem } from '../../features/cart/cartSlice.js';

import ResponsiveImage from "../responsive-image/responsive-image.component.jsx";
const ShopProduct = () => {

  const { t } = useTranslation();
  const { i18n } = useTranslation(); // Pridobimo objekt i18n
  const currentLanguage = i18n.language; // Trenutni jezik
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const dispatch = useDispatch();
  
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
   const handleAddToCart = () => {
          dispatch(addItem({ 
            id: product.id, 
            name: translatedTitle, 
            price: product.price, 
            quantity: 1,
            vat_rate: product.vat_rate,
            item_stock: product.itemStorage,
            image: product.image }));
   };



  // Prevajanje
  const translatedTitle = translations?.[currentLanguage]?.title || title;
  const translatedDescription = translations?.[currentLanguage]?.description || description;
  const translatedLongDescription = translations?.[currentLanguage]?.longDescription || longDescription;

  return (
    <div className="container-fluid product-content">

         {/* Header */}
         <div className="row product-header py-4">
    <div className="col">
      <div className="container">
        <span className="h3">{title}</span>
        <span className="h3 text-muted">&nbsp;|&nbsp;</span>
        <span className="h4 text-muted">{category}</span>
      </div>
    </div>
  </div>

  {/* Product Section */}
  <div className="container my-4">
    <div className="row">
      {/* Left Column */}
      <div className="col-md-5 mb-4">       
        <ResponsiveImage 
            src={image}
            title={translatedTitle}
           // className={`responsive-img lazyload ${className}`}
            className="responsive-img lazyload"
          
            />   
      </div>
      {/* Right Column */}
      <div className="col-md-6">
        <h2 className="mb-3">{title}</h2>
        <p className="h3 text-muted">{formatCurrency(price)}€</p>
        <hr />
        <div className="my-3">
          <StarRating averageRating={averageRating} />
          &nbsp; &nbsp;
          <strong>{numberOfReviews} {t("product.reviews")}</strong>
          &nbsp; &nbsp;
          <a href="#">{t("product.showall")}</a>
        </div>
        <p>{translatedDescription}</p>
        <div className="my-3">
          <button className="btn btn-primary mt-3" onClick={handleAddToCart}>{t("product.addtochart")}</button>
        </div>
        <table className="table table-borderless mt-4">
          <tbody>
            <tr>
              <td className="text-end fw-bold">{t("product.productID")}:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">{t("product.manufacturer")}:</td>
              <td>
                <NewWindowLink
                  url={original_product_url}
                  linkText={producer}
                  title="to original product page"
                  className="custom-class"
                />
              </td>
            </tr>
            <tr>
            <td className="text-end fw-bold">{t("product.stock")}:</td>
            <td>
            {product.itemStorage > 0 ? (
          <span className='stockOK'>{product.itemStorage} {t("product.instock")}</span>
          ) : (
          <span className='stockZero'>{t("product.outofstock")}</span>)}
            </td>
            </tr>
            <tr>
            <td className="text-end fw-bold">{t("product.views")}:</td>
            <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Tabs */}
  <div className="row bg-light py-4">
    <div className="col">
      <h2 className="mb-3">{translatedTitle}</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">
          {t("product.details")}
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
          {t("product.techdetails")}
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
          {t("product.reviews")}
          </a>
        </li>
      </ul>
      <div className="mt-3">
        <p>{translatedLongDescription}</p>
        <p>Rating: {averageRating} ({numberOfReviews} reviews)</p>
      </div>
    </div>
  </div>
</div>
  );
};

export default ShopProduct;
