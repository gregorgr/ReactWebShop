import  { useState, useMemo, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductContext } from "../../context/products/products.context.jsx";
import { useDispatch } from 'react-redux';

import './shop-product.styles.scss';
import "./shop-tooltip.styless.scss";

import ShopProductTabs from '../../components/shop/shop-product-tabs/shop-product-tabs.component.jsx';
import StarRating from "../../components/star-rating/star-rating.component.jsx";
import { addItem } from '../../features/cart-slice/cartSlice.js';
import { fetchSingleProduct } from '../../services/apiService.js';
// import { mergeProductFull } from "../../services/dataTransformer.js";

import ResponsiveImage from "../../components/responsive-image/responsive-image.component.jsx";
//"../../responsive-image/responsive-image.component.jsx";
import Loading from '../../components/loading/loading.component.jsx';

const ShopProductPage = () => {

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik

  const { productId } = useParams();
  const dispatch = useDispatch();
 

  //const { products: staticProducts } = useContext(ProductContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]); //useState(staticProducts);
 

  
  // Poiščite produkt glede na ID
  // const product = products.find((item) => item.id === parseInt(productId));




  useEffect(() => {
      const loadSingleProduct = async () => {
        try {
          setIsLoading(true); // Označi začetek nalaganja
          setError(null);
          const xtoken = null;
          console.log("ShopPage: BEFORE loadSingleProduct: productData: ");
          const productData = await fetchSingleProduct(productId, currentLanguage, xtoken);
         // console.log("ShopPage: BEFORE: product: ",product);
          console.log("ShopPage:loadSingleProduct: productData: ",productData);
          setProduct(productData); // Posodobimo stanje s pridobljenimi produkti
         
        } catch (err) {
          console.error("Failed to fetch products:", err);
          setError("Failed to load products.");
        } finally {
          setIsLoading(false);
          setError(null);
        }
      };
      const loadData = async () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Pavza 3 sekunde
      };
  
      

     // loadData();
      loadSingleProduct();
      loadData();

  }, [currentLanguage, productId]);

    if (isLoading) return <Loading />;
 if (error) return <div>Error: {error}</div>;
/*
  if (!product) {
    return <p>Product not found</p>;
  }
*/
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value).replace('€', ''); // Odstranimo simbol €, če je potreben samo znesek
  };

 
  const {
    id,
    name,
    
    price,
    vat_rate,  
    producer,
   // original_product_url,
    itemStorage,
    categoryId, 
    categoryName,
   // image,
    mainPictureUrl,
    mainProductUrl,
    brand,  
    manufacturer,
    longDescription,
    shortDescription,
    numberOfReviews, 
    averageRating,
    rewiews
     // title,
    // translations,
    // description,
       // item_stock, 
   // category,
   // category_id,
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
            id: id, 
            name: name, 
            price:price, 
            quantity: 1,
            vat_rate: vat_rate,
            item_stock: itemStorage,
            image: mainPictureUrl }));
   };

   {product?.itemStorage > 0 
    ? t('cart.inStock', { stock: itemStorage }) 
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
  //const translatedTitle = translations?.[currentLanguage]?.title || title;
  //const translatedDescription = translations?.[currentLanguage]?.description || description;
  //const translatedLongDescription = translations?.[currentLanguage]?.longDescription || longDescription;

  return (
    <div className="container-fluid product-content">
        {/* Header */}
        <div className="row product-header py-4">
        <div className="col">
        <div className="container">
        <span className="h3">{name}</span>
        <span className="h3 text-muted">&nbsp;|&nbsp;</span>
        <span className="h4 text-muted">{categoryName}</span>
        </div>
        </div>
        </div>
        <ShopProductTabs product={product} />

    </div>

  );
};

export default ShopProductPage;
