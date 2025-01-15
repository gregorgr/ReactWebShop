import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./checkout-payment.styles.scss";

import VisaIcon  from '../../../assets/visa.svg';
import VisaChip  from '../../../assets/visa-chip.svg';

import { useAuth } from '../../../context/auth-context/auth-context.utils';

const CheckoutPayment = ({cartStep, handleAction}) => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    // <img src={VisaIcon} alt="Visa Icon" className="visa-icon" />;
    const [newCard, setNewCard] = useState({
        cardno: '',
        cardnoFormated: '',
        name: '',
        valid: '',
        validFormated: '',
        cvv: '',
      });
      /*
      newCard.cardno
      newCard.name: '',
      newCard.valid: '',
      newCard.cvv: '',
      */
      const formatCreditCardSpaces = (value) => {
        const onlyNumbers = value.replace(/\D/g, '').slice(0, 16);
        return onlyNumbers.replace(/(\d{4})(?=\d)/g, '$1 ');
      };

      const formatCardExpiry = (value) => {
        // Odstrani vse neštevilčne znake
        const onlyNumbers = value.replace(/\D/g, '');
      
        // Formatira kot MM/YY
        return onlyNumbers.replace(/(\d{2})(\d{0,2})/, (match, month, year) => {
          // Preveri, da mesec ne presega 12
          const validatedMonth = Math.min(parseInt(month, 10), 12).toString().padStart(2, '0');
          return year ? `${validatedMonth}/${year}` : validatedMonth;
        });
      };

      const handleCardInputChange = (e)=>{
        const { name, value } = e.target;

        if (name==="cardno"){
            const formatted = formatCreditCardSpaces(value);
            console.log('Formatted Card Number:', formatted);
            setNewCard((prevState) => ({
                ...prevState,
                ["cardnoFormated"]: formatted,
              }));
        }else if(name==="valid"){
            const formatted = formatCardExpiry(value);
            setNewCard((prevState) => ({
                ...prevState,
                ["validFormated"]: formatted,
              }));
        }

        setNewCard((prevState) => ({
            ...prevState,
            [name]: value,
          }));
      }

    return (
        <>
                <div className="checkout-main-content">

                <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.payment")}</h1>
                 
                </div>
                


                <div className="checkout-payment gridContainer">
     
     <div className="creditCard">
       <div className="visaLogo">
 
            <img src={VisaIcon} alt="Visa Icon" title="Visa Icon"  className="visa-icon" />
       </div>
       <div className="chipLogo">
         <img src={VisaChip} alt="Card chip" title="Visa čip"  className="" />
       </div>
       <ul className="ccList card-number">
         <li>{newCard.cardnoFormated}</li>
       </ul>
       {/*
        newCard.cvv: '',
              */
       }
       <h4 className="name">{newCard.name}</h4>
       <h4 className="year">{newCard.validFormated} </h4>
     </div>

     <form action="#" id="paymentForm">
       <h6>{t("checkout.paymentDetails")}</h6>
       <div className="inputCon" id="name" data-top={t("checkout.nameOnCard")}>
         <input type="text" 
         name="name" 
         value={newCard.name}
         onChange={handleCardInputChange}
         placeholder=""/>
       </div>
       <div className="inputCon" id="cardNum" data-top="Card Number" 
       title={t("checkout.cardNumberHint")}>
         <input type="text" 
         name="cardno" 
         maxLength={16}
         value={newCard.cardno}
         onChange={handleCardInputChange}
         placeholder=""/>
       </div>
       <div className="inputCon" id="validYear" data-top={t("checkout.validThrough")}>
         <input type="text" 
          name="valid" 
          maxLength={4}
          value={newCard.valid}
          onChange={handleCardInputChange}
          placeholder=""/>
       </div>
       <div className="inputCon" id="cvv" data-top={t("checkout.cvv")}>
         <input type="text"
         name="cvv"  
         maxLength={4}
          value={newCard.cvv}
          onChange={handleCardInputChange}
          placeholder=""/>
       </div>
     </form>
   </div>
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
                        > {t("checkout.back")}</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            // e.preventDefault();
                            handleAction( "finish");
                        }}
                            >{t("checkout.placeOrder")}</a>
            </div>

        


       
        </>
    );
};

CheckoutPayment.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}

export default CheckoutPayment;