//import React, {useContext} from 'react';
import { useSelector } from 'react-redux';


import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import './cart-icon.styles.scss';

//import { removeItem, clearCart } from '../../features/cart/cartSlice';


const CartIcon = () =>{
    const { t } = useTranslation();
    // const cartCount = 2;

    const { totalQuantity} = useSelector((state) => state.cart);


    return (
      <>
      <div className="cart-icon-container">
   
         <FontAwesomeIcon
                      icon={faCartShopping}
                      size="lg"
                      role="img" // Označi ikono kot sliko
                      aria-label={t("shop.icon")}
                    />  
                    { totalQuantity>0 ? (
                    <span className="cart-counter">{totalQuantity}</span>
                    ) :""
                    }
                    
     
         </div>
       </>
    );
}


export default CartIcon;


/*
<Link
            to="/cart"
            title={cartLabels[language][1]} // Tooltip za vizualne uporabnike
            aria-label={cartLabels[language][1]} // Dostopna oznaka za bralnike zaslona
            tabIndex="21" // Omogoča fokus s tipkovnico
            className='cart-icon'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <CartIcon />
           
          </Link>
*/