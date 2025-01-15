import  { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeItem } from '../../../features/cart-slice/cartSlice';
// import { CartContext } from '../../context/cart-context/cart-context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Uvozi useNavigate

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

//import B

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
// import CustomButton from '../elements/custom-button/custom-button.component';
import './cart-preview.styles.scss';


const CartPreview = () =>{
    const { t } = useTranslation();
    // const { cart } = useContext(CartContext);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
  
    const navigate = useNavigate();

    /*
    const formatPrice = (priceString) => {
        const numericPrice = parseFloat(priceString.replace(/\./g, '').replace(',', '.'));
        return numericPrice || 0; // Vrne 0, če je vrednost neveljavna
      };
*/
    const toggleCartPreview = () => setIsOpen(!isOpen);
  
    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('sl-SI', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
        }).format(value).replace('€', ''); // Odstranimo simbol €, če je potreben samo znesek
      };
    
      const truncateText = (text, maxLength = 33) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '..' : text;
      };

      const handleGoToCart = () => {
        setIsOpen(false); // Skrij predogled košarice
        // Tukaj lahko dodate navigacijo na stran s košarico, če želite.
        navigate('/checkout'); // Preusmeri na stran /cart
      };
  
      const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return(
        <div className="cart-icon-container">
        <div className={`cart-preview ${isOpen ? 'open' : ''}`}>
        <div className="cart-icon" onClick={toggleCartPreview}>
             <FontAwesomeIcon
                                  icon={faCartShopping}
                                  size="lg"
                                  role="img" // Označi ikono kot sliko
                                  aria-label={t("shop.icon")}
                                /> 
          {
            // <i className="fas fa-shopping-cart"></i>
          } 
          {cart.items.length > 0 && <span className="cart-count">{itemsCount}</span>}
        </div>
  
        <div className="cart-dropdown">
          <h3>Cart Preview1</h3>
          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {cart.items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{truncateText(item.name)}</h4>
                    <p>
                      {item.quantity} x {formatCurrency(item.price)} €
                    </p>
                  </div>
                  {
/*
    <button
                    className="remove-item"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    &times;
                  </button>
*/
                  }
              
                </li>
              ))}
            </ul>
          )}
          {cart.items.length > 0 && (
            <>
              <div className="cart-total">
                <strong>Total:</strong> {formatCurrency(total)} €
              </div>
              <button to="/checkout" className="go-cart-button" onClick={handleGoToCart}>
               {t("cart.gotocheckout")}
              </button>
            </>
          )}
        </div>
      </div>
      </div>
      );
}


export default CartPreview;

/*


   <div className="cart-dropdown">
        <div className='cart-dropdown-items'>


        </div>
        <CustomButton>{t("shop.gotocheckout")}</CustomButton>

    </div>);
    */


