// import statements...
import { useTranslation } from 'react-i18next';
import "./shop-product-tabs.styles.scss";
import PropTypes from 'prop-types';

import FeaturesSvg  from '../../../assets/img/features.svg';
import DeliverycontentSvg  from '../../../assets/img/deliverycontent.svg';
import ShippingSvg  from '../../../assets/img/shipping.svg';
import ReturnsSvg  from '../../../assets/img/returns.svg';


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

    <div className='product-bottom-tabs'>


            <div className="tabs">
                <input type="radio" id="tab1" name="tab-control" checked />
                <input type="radio" id="tab2" name="tab-control" />
                <input type="radio" id="tab3" name="tab-control" />
                <input type="radio" id="tab4" name="tab-control" />
                <input type="radio" id="tab5" name="tab-control" />
                <ul>
                    <li title={t("shop.descriptionTitle")}>
                    <label htmlFor="tab1" role="button">
                        <img src={FeaturesSvg} alt="Features Icon" title="Features Icon"  className="filter-svg" />                   
                        <br />
                        <span>{t("shop.descriptionTitle")}</span></label>
                    </li>
                    <li title={t("product.techdetails")}>
                    <label htmlFor="tab2" role="button">
                        <img src={FeaturesSvg} alt="Features Icon" title="Features Icon"  className="filter-svg" />                   
                        <br />
                        <span>{t("product.techdetails")}</span></label>
                    </li>
                    <li title={t("product.warrantyTitle")}>
                    <label htmlFor="tab3" role="button">
                        <img src={FeaturesSvg} alt="Features Icon" title="Features Icon"  className="filter-svg" />                   
                        <br />
                        <span>{t("product.warrantyTitle")}</span></label>
                    </li>
                    <li title={t("shop.shippingTitle")}>
                    <label htmlFor="tab4" role="button">
                        <img src={ShippingSvg} alt="Shipping Icon" title="Shipping Icon"  className="filter-svg" />                    
                        <br/>
                        <span>{t("shop.shippingTitle")}</span></label>
                    </li>
                    <li title="Returns">
                    <label htmlFor="tab5" role="button">
                        <img src={ReturnsSvg} alt="Returns Icon" title="Returns Icon"  className="filter-svg" />                    
                        <br />
                        <span>{t("shop.returnTitle")}</span></label>
                    </li>
                </ul>
                <div className="slider">
                    <div className="indicator"></div>
                </div>
                <div className="content">
                    <section>
                    <h2>{t("shop.descriptionTitle")}</h2>
                    {product.longDescription}
                    </section>
                    <section>
                    <h2>{t("product.techdetails")}</h2>
                    {t("product.techdetails")}
                    </section>
                    <section>
                    <h2>{t("product.warrantyTitle")}</h2>
                    {t("product.warrantyInfo")}
                    </section>
                    <section>
                    <h2>{t("shop.shippingTitle")}</h2>
                    {t("shop.shippingContent")}
                    </section>
                    <section>
                    <h2>{t("shop.returnTitle")}</h2>
                    {t("shop.returnsContent")}
                    </section>
                </div>
            </div>

          
        

      
            
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