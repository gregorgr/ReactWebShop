// import statements...
import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import "./checkout-shipping.styles.scss";

import { useAuth } from '../../../context/auth-context/auth-context.utils';


const CheckoutShipping = ({cartStep, handleAction}) => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();




    return (
        <>
        
        <div className="checkout-main-content">
                {/* Prva vrstica */}
            

                <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.shipping")}</h1>
                </div>

                { <p>Glavna vsebina</p>}
                { user ? (
                        <p>logiran</p>
                    ):(
                        <p>ni logiran</p>
                    )
                }

                </div>



            </div>


            <div className="checkout-navigation">
                <div className="nav-button step-back">
                    <a 
                    href="#" 
                    className="btn continue nav-button  step-back left" 
                    onClick={() => {
                        handleAction( "cart");
                        }}>Nazaj</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            handleAction( "payment");
                        }}>Na plačilo</a>
            </div>

        </>
    );
};
CheckoutShipping.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}
export default CheckoutShipping;