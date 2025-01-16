import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import "./checkout-payment.styles.scss";

import VisaIcon  from '../../../assets/visa.svg';
import VisaChip  from '../../../assets/visa-chip.svg';

import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { useDispatch } from 'react-redux'; // Uvoz Redux dispatch
import { setOrderDate } from '../../../features/cart-slice/cartSlice'; // Akcija za posodobitev naslova


const CheckoutPayment = ({cartStep, handleAction}) => {
     // import { useTranslation } from 'react-i18next';
 const { t, i18n } = useTranslation();
 const currentLanguage = i18n.language; // Trenutni jezik

    const { user, token } = useAuth();
    // <img src={VisaIcon} alt="Visa Icon" className="visa-icon" />;
    const cart = useSelector((state) => state.cart); 
    const dispatch = useDispatch(); // Inicializacija Redux dispatch

    const [newCard, setNewCard] = useState({
        cardno: '',
        cardnoFormated: '',
        name: '',
        valid: '',
        validFormated: '',
        cvv: '',
      });
      const [cartDetails, setCartDetails] = useState(null); 
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

    // Preberi podrobnosti košarice ob nalaganju komponente
    useEffect(() => {
      const calculateCartDetails = () => {
          const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          const totalVAT = cart.items.reduce((sum, item) => {
              const vatAmount = item.quantity * (item.price - item.price / ((100 + item.vat_rate) / 100));
              return sum + vatAmount;
          }, 0);
          const total = subtotal + totalVAT + cart.shippingCost;

          return {
              items: cart.items,
              subtotal,
              totalVAT,
              total,
              shippingCost: cart.shippingCost,
              shippingName: cart.shippingMethod,
              address: cart.shippingAddress,
          };
      };

      const details = calculateCartDetails();
      setCartDetails(details);
      console.log("Cart Details:", details); // Izpis v konzolo
    }, [cart]);

    const handleFinishOrder = () => {
      dispatch(setOrderDate(new Date().toISOString()));
      /* if (!selectedAddress.nameto || !selectedAddress.addressLine1 || !selectedAddress.city) {
           console.error('Address is incomplete.');
           return;
       }*/
       //totalQuantity, totalAmount, selectedShipping, subtotal, total
      // console.log("handleProceedNext: totalQuantity=",totalQuantity);
      // console.log("handleProceedNext: totalAmount=",totalAmount);
      // console.log("handleProceedNext: selectedShipping=",selectedShipping);
      // console.log("handleProceedNext: subtotal=",subtotal);
      // console.log("handleProceedNext: total=",total);

      // dispatch(setShippingMethod({ text: 'Express Shipping', cost: 15.0 }));

       //handleAction('payment', cartData); // Pokliči zbrane podatke in premik na plačilo
       handleAction( "finish");
     };


    // 

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
                        onClick={handleFinishOrder}
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