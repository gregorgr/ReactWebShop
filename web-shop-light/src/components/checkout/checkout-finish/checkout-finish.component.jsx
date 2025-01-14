// import statements...
import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./checkout-finish.styles.scss";

const CheckoutFinish = () => {
    const { t } = useTranslation();
    return (
        <> 
        <div className="checkout-main-content">
                {/* Prva vrstica */}
            

                <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.finish")}</h1>

                </div>
                components: CheckoutFinish
                { <p>Glavna vsebina</p>}


                </div>



            </div>



        </>
    );
};

export default CheckoutFinish;