// import statements...
import { useTranslation } from 'react-i18next';
import "./shop-product-tabs.styles.scss";
import PropTypes from 'prop-types';

const ShopProductTabs = ({product}) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language; // Trenutni jezik

    /*
        ,
        shortDescription,
        product.shortDescription
        product.techDetails
        product.warranty
// techDetails
    */
    return (
        <>
        {/* Tabs */}
            <div className="row bg-light py-4">
            <div className="col">
            <h2 className="mb-3">{}</h2>
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
            <p>{product.longDescription}</p>
            <p>Rating: {product.averageRating} ({product.numberOfReviews} reviews)</p>
            </div>
            </div>
            </div>
            <div>{product.longDescription}</div>

            <div>
                <h4>{t("product.techdetails")}</h4>
                <p>{t("product.techDetailsText")}</p>
            </div>
            <div>
                <h4>{t("product.warrantyTitle")}</h4>
            <p> {t("product.warrantyInfo")}</p>

            </div>
            
            
        
        </>
    );
};

ShopProductTabs.propTypes = {
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

export default ShopProductTabs;