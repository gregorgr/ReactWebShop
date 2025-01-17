import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductContext } from "../../context/products/products.context.jsx";
import { useDispatch } from 'react-redux';

import './shop-product.styles.scss';
import "./shop-tooltip.styless.scss";


import StarRating from "../../components/star-rating/star-rating.component.jsx";
import { addItem } from '../../features/cart-slice/cartSlice.js';

import ResponsiveImage from "../../components/responsive-image/responsive-image.component.jsx";
//"../../responsive-image/responsive-image.component.jsx";
import {mergeProductFromList} from '../../services/dataTransformer.js';
import { fetchProducts } from '../../services/apiService.js';

const ShopProduct = () => {
// import { useTranslation } from 'react-i18next';
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
 // Trenutni jezik
  const { productId } = useParams();
  const { products: staticProducts } = useContext(ProductContext);
  const [product, setProduct] = useState();
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  console.log("ShopProduct before1 ");
  console.log("currentLanguage1 ", currentLanguage);
  console.log("after1");

  useEffect(() => {
    const loadProduct = async () => {
        try {
            //console.log("before loadProducts ");

            // Poiščite produkt glede na ID iz statičnih podatkov
            const selProduct = staticProducts.find(
              (item) => item.id === parseInt(productId)
            );

            if (!selProduct) {
                setError('Product not found');
                setIsLoading(false);
                return;
            }
            // Začnite z osnovnim produktom
            setProduct(selProduct);
            console.log("selProduct ", selProduct);
            // console.log("currentLanguage2 ", currentLanguage);
            const xtoken = null;
            const productData = await fetchProducts(xtoken, currentLanguage);
           // console.log("loadProducts: productData: ",productData);
           // console.log("-- product ",productData[0]);
           console.log("productData", productData);

            const updatedProduct = mergeProductFromList(product, productData); // Združi podatke
            
            console.log("updatedProduct", updatedProduct);
            setProduct(updatedProduct); // Posodobi stanje
            //setProductsList(productData);
            //setProducts(productData);
        } catch (err) {
            setError('Failed to load product.');
            console.error("Load ERROR: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    loadProduct();
  }, [productId, staticProducts]);

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }

  if (!product) {
      return <p>Product not found</p>;
  }

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


  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value).replace('€', ''); // Odstranimo simbol €, če je potreben samo znesek
  };


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

   {product?.item_stock > 0 
    ? t('cart.inStock', { stock: product.item_stock }) 
: t('cart.outOfStock')}
console.log("itemStorage: "+ itemStorage)
const addToCartTooltip = (itemStorage) => {
  if (itemStorage === 0) {
    return t("product.storage0");
  } else if (itemStorage === 1 ) {
    return `${t("product.storage1")} ${itemStorage} ${t("product.quantitty1")}`;
  } else if ( itemStorage === 2) {
    return `${t("product.storage1")} ${itemStorage} ${t("product.quantitty2")}`;
  } else {
    return `${t("product.storageX")} ${itemStorage} `;
  }
};

/*
       "":"Trenutno ni zaloge, dobavni časi so lahko daljši",
       "product.storage1":"Na zalogi samo",
       "product.storageX":"Na zalogi ",
       {t("product.quantitty1")}: "izdelek",
        "product.quantitty2": "izdeleka",
        "product.quantitty3": "izdelekov"


*/

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
            alt={translatedTitle}
            title={translatedTitle}
           // className={`responsive-img lazyload ${className}`}
            className="responsive-img lazyload"
          
            />   
      </div>
      {/* Right Column */}
      <div className="col-md-6">
        <h2 className="mb-3">{title}</h2>
        <p className="text-muted produckt-price text-center">{formatCurrency(price)}€</p>
        <hr />



        <div className="container">
        <div className="d-flex flex-wrap">
        <div className="box flex-fill p-3 text-center">
        <div className="my-1 inline-li-content">
        
          
          <StarRating averageRating={averageRating} />
          &nbsp; &nbsp;
          <strong>{numberOfReviews} {t("product.reviews")}</strong>
          &nbsp; &nbsp;
          <a href="#">{t("product.showall")}</a>
        </div>
        <p>{translatedDescription}</p>
        <div className="my-3">

        <div className="con-tooltip top">
        <div className="rounded-0 product-overlay d-flex align-items-left justify-content-left">
         

                {
                // add to cart BUTTON
              }
         <Link className="btn btn-success text-white mt-2" 
                    to="#"
                    onClick={handleAddToCart}
                >
                <i className="fas fa-cart-plus"></i>
              </Link>
              <div className="tooltip ">
            <p>{addToCartTooltip(itemStorage)}...</p>
          </div>
        </div>
</div>
</div>


  

    
        </div>


        <div className="box flex-fill p-3 text-center">
        <table className="table table-borderless">
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
                  title={t("product.productUrl")}
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