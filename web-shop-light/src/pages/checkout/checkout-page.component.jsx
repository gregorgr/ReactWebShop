// import statements...
import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { Outlet, Link, useParams } from "react-router-dom";
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



import CheckoutFlow from '../../navigation/checkout-flow/checkout-flow.component.jsx';

import Loading from '../../components/loading/loading.component.jsx';
import "./checkout-page.styles.scss";

const CheckoutPage = () => {
  const [cartStep, setCartStep] = useState("cart");
    const { t } = useTranslation();
    const { step: step } = useParams();
    
    const CheckoutCart = lazy(() => import('../../components/checkout/checkout-cart/checkout-cart.component.jsx' ));
    const CheckoutPayment = lazy(() => import('../../components/checkout/checkout-payment/checkout-payment.component.jsx'));
    const CheckoutShipping = lazy(() => import('../../components/checkout/checkout-shipping/checkout-shipping.component.jsx'));
    const CheckoutFinish = lazy(() => import('../../components/checkout/checkout-finish/checkout-finish.component.jsx'));
    // const [step, setStep] = useState("cart");
    const renderStep = () => {
      switch (cartStep) {
        case "cart":
          return <CheckoutCart  cartStep={cartStep} handleAction={handleAction}/>;
        case "shipping":
          return <CheckoutShipping cartStep={cartStep} handleAction={handleAction}/>;
        case "payment":
          return <CheckoutPayment cartStep={cartStep} handleAction={handleAction}/>;
        case "finish":
          return <CheckoutFinish />;
        default:
          return <CheckoutCart cartStep={cartStep} handleAction={handleAction}/>;
      }
    };

    const handleAction = (action) => {
      //e.preventDefault();
      console.log("CheckoutPage handleAction:", action)
      setCartStep(action);
    };


    console.log("CheckoutPage cartStep:", cartStep)
      return (
        <><div className='co1ntainer'>
          <div className='checkout-container'>
            <div id="steps">
              <ul className="count">
                <li className={cartStep === "cart" ? "selected" : ""}>Cart</li>
                <li className={cartStep === "shipping" ? "selected" : ""}>Shipping</li>
                <li className={cartStep === "payment" ? "selected" : ""}>Payment</li>
                <li className={cartStep === "finish" ? "selected" : ""}>Finish</li>
              </ul>
              <div id="tabs">
                <div className="checkout-layout-container">
                  <Suspense fallback={<Loading />}>
                  {renderStep()}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <ul className="count">
                <li className={cartStep === "cart" ? "selected" : ""}>
                    <button onClick={() => setCartStep("cart")}>Cart</button></li>
                <li className={cartStep === "shipping" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("shipping")}>Shipping</button></li>
                <li className={cartStep === "payment" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("payment")}>Payment</button></li>
                <li className={cartStep === "finish" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("finish")}>Finish</button></li>
            </ul>
    
          </div>
        </>
    );

   // <CheckoutFlow cartStep={cartStep} setCartStep={setCartStep} />
};

export default CheckoutPage;

/*
 const renderStep = () => {
        switch (step) {
          case "cart":
            return <CheckoutCart />;
          case "shipping":
            return <CheckoutShipping />;
          case "payment":
            return <CheckoutPayment />;
          case "finish":
            return <CheckoutFinish />;
          default:
            return <CheckoutCart />;
        }
      };

*/


/*

*/
