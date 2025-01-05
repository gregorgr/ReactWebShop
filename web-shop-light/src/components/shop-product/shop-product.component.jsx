import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { ProductContext } from "../../context/products/products.context.jsx";

const ShopProduct = () => {
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

  const {
    title,
    description,
    longDescription,
    image,
    price,
    averageRating,
    numberOfReviews,
    translations,
  } = product;

  // Prevajanje
  const translatedTitle = translations?.[currentLanguage]?.title || title;
  const translatedDescription = translations?.[currentLanguage]?.description || description;
  const translatedLongDescription = translations?.[currentLanguage]?.longDescription || longDescription;

  return (
    <div className="product-page">
      <h1>{translatedTitle}</h1>
      <img src={image} alt={translatedTitle} />
      <p>{translatedDescription}</p>
      <p>{translatedLongDescription}</p>
      <p>Price: {price}€</p>
      <p>Rating: {averageRating} ({numberOfReviews} reviews)</p>
    </div>
  );
};

export default ShopProduct;
