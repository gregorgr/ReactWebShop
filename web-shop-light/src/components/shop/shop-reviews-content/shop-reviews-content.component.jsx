// import statements...
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./shop-reviews-content.styles.scss";

const ShopReviewsContent = ({product}) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language; 


    return (
        <>
         <div className="mt-3">
            <p>{t("product.reviews")}</p>
            <p>Rating: {product.averageRating} ({product.numberOfReviews} reviews)</p>
            </div>
        
        
        </>
    );
};


ShopReviewsContent.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        vat_rate: PropTypes.number.isRequired,
        producer: PropTypes.string.isRequired,
        itemStorage: PropTypes.number.isRequired,
        categoryId: PropTypes.number.isRequired,
        categoryName: PropTypes.string.isRequired,
        mainPictureUrl: PropTypes.string.isRequired,
        mainProductUrl: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        manufacturer: PropTypes.string.isRequired,
        longDescription: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        numberOfReviews: PropTypes.number.isRequired,
        averageRating: PropTypes.number.isRequired,
        rewiews: PropTypes.arrayOf(
        PropTypes.shape({
            reviewer: PropTypes.string,
            rating: PropTypes.number,
            comment: PropTypes.string,
        })
        ),
   // warranty: PropTypes.string.isRequired, // Dodatno polje za garancijo
   // techDetails: PropTypes.string.isRequired, // Dodatno polje za tehnične podrobnosti
    })
  };

export default ShopReviewsContent;