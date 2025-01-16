// import statements...
import {useState, useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./checkout-finish.styles.scss";

import { useAuth } from '../../../context/auth-context/auth-context.utils.jsx';
import { clearCart } from '../../../features/cart-slice/cartSlice';
import { sendOrder } from '../../../services/apiService.js';


const CheckoutFinish = ({ cartStep, handleAction }) => {
     // import { useTranslation } from 'react-i18next';
 const { t, i18n } = useTranslation();
 const currentLanguage = i18n.language; // Trenutni jezik
 
    const { user, token } = useAuth();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart); // Stanje košarice iz Redux
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);

    useEffect(() => {
        const submitOrder = async () => {
            // Preveri stanje košarice ob nalaganju
            if (!cart.items || cart.items.length === 0) {
                setError(t('cart.errorEmpty'));
                setIsLoading(false);
                return;
            }

            if (!cart.shippingAddress) {
                setError(t('cart.errorNoAddress'));
                setIsLoading(false);
                return;
            }

            if (!cart.shippingMethod) {
                setError(t('cart.errorNoShippingMethod'));
                setIsLoading(false);
                return;
            }
            console.log("submitOrder orderData");
            const orderData = {
               // userId: cart.userId || 0,
                orderShippingMethod: cart.shippingMethod,
                customerName: cart.shippingAddress.nameto,
                customerEmail: cart.shippingAddress.email,
                customerPhone: cart.shippingAddress.phone,
                shippingAddress: cart.shippingAddress.addressLine1,
                billingAddress: cart.shippingAddress.billingAddress || '',
                customerNotes: cart.customerNotes || '',
                totalAmount: cart.totalAmount,
                vatAmount: cart.totalVAT,
                discountAmount: cart.discountAmount || 0,
                paymentMethod: "OK", // paymentMethod: cart.payment.method,
                orderProducts: cart.items.map(item => ({
                    productId: item.id,
                    productName:item.name,
                    quantity: item.quantity,
                    pricePerUnit: item.price,
                    totalPrice: item.price * item.quantity,
                    vatRate: item.vat_rate,
                    vatAmount: item.quantity * (item.price - item.price / ((100 + item.vat_rate) / 100)),
                })),
            };
            console.log(orderData);
            try {
                //const token = cart.token || null;
               
                const sendToken = token || null;
            
                console.log("CheckoutFinish submitOrder orderData: ", orderData)   
                
                await sendOrder(orderData, sendToken);
                dispatch(clearCart());
                setIsOrderSuccess(true);
                setIsLoading(false);
            } catch (err) {
                console.log("ERROR: CheckoutFinish on sendOrder: ", err)
                setError(t('checkout.errorOrderFailed'));
                setIsLoading(false);
            }
        };
        submitOrder();

        setError(null); // Ni napak
        setIsLoading(false); // Nalaganje končano
    }, [cart, t, dispatch]);

    const handleProceedNext = () => {
        if (error) {
            console.error('Napaka pri preverjanju košarice:', error);
            return;
        }

        // Nadaljuj na naslednji korak
        handleAction('shipping');
    };

    if (isLoading) {
        return <p>{t('cart.loading')}</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <> 
        <div className="checkout-main-content">
                {/* Prva vrstica */}
            

                <div className="wrapx">
                <div className="heading cf">
                    { error ? (
                        <h1 className='errorText'>{t("checkout.finishTitleError")}</h1>
                    ):(
                        <h1>{t("checkout.finishTitleOK")}</h1>
                    )}
                    

                </div>
                <div className="thank-you-message">
                    { error ? (
                        <p className='errorText'>{error}</p>
                    ):(
                        <p>{t("checkout.thankYou")}</p>
                    )}
                
                </div>


                </div>



            </div>



        </>
    );
};
CheckoutFinish.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}
export default CheckoutFinish;