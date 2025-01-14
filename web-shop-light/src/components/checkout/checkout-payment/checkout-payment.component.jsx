import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./checkout-payment.styles.scss";

import { useAuth } from '../../../context/auth-context/auth-context.utils';

const CheckoutPayment = ({cartStep, handleAction}) => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    return (
        <>
                <div className="checkout-main-content">
                {/* Prva vrstica */}
            

                <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.payment")}</h1>
                 
                </div>
                components: CheckoutPayment
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
                        // e.preventDefault();
                        handleAction( "shipping");
                    }}
                        >Nazaj</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            // e.preventDefault();
                            handleAction( "finish");
                        }}
                            >Oddaj naročilo</a>
            </div>

        


       
        </>
    );
};

CheckoutPayment.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}

export default CheckoutPayment;