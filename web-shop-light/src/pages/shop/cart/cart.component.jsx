import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../../features/cart/cartSlice';


import './cart.styles.scss';


// import { CartContext } from '../../../context/cart-context/cart-context.provider';

const Cart = ({ language }) => {
  const { t } = useTranslation();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

   // Možnosti poštnine
   const shippingOptions = [
    { id: 'standard', label: t("cart.standardShipping"), cost: 5.0 },
    { id: 'express', label: t("cart.expressShipping"), cost: 15.0 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value).replace('€', '');
  };
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // Stalna vrednost za DDV in poštnino
  const VAT_RATE = 0.22; // 22%
  const SHIPPING_COST = 5.0; // Poštnina

  const subTotal = items.reduce((sum, item) => sum + item.quantity*item.price, 0);
  // Izračuni
  const totalVAT = items.reduce((sum, item) => sum + item.quantity*item.price*item.vat_rate/100, 0);
  //(totalAmount * VAT_RATE).toFixed(2); // Izračun DDV
  const grandTotal =subTotal+ totalVAT + SHIPPING_COST;
  
  //(parseFloat(totalAmount) + parseFloat(totalVAT) + SHIPPING_COST).toFixed(2);
   // Skupaj z DDV in poštnino

  return (
    <div className="wrap cf">
      <h1 className="projTitle">Responsive Table<span>-Less</span> Shopping Cart</h1>
      <div className="heading cf">
        <h1>{t("cart.title")}</h1>
        <a href="/shop" className="continue">{t("cart.continueShopping")}</a>
      </div>

      <div className="cart">
        <ul className="cartWrap">
          {items.map((item, index) => (
            <li className={`items ${index % 2 === 0 ? 'odd' : 'even'}`} key={item.id}>
              <div className="infoWrap">
                <div className="cartSection">
                  <img src={item.image} alt={item.name} className="itemImg" />
                  <p className="itemNumber">{item.itemNumber}</p>
                  <h3>{item.name}</h3>
                  <p>
                    <input
                      type="text"
                      className="qty"
                      value={item.quantity}
                      readOnly
                    />{' '}
                    x {formatCurrency(item.price)}€
                  </p>
                  <p className={`stockStatus ${item.inStock ? '' : 'out'}`}>
                    {item.inStock ? t("cart.onstock") : t("cart.outofstock")}
                  </p>
                </div>
                <div className="prodTotal cartSection">
                  <p>{(item.quantity * item.price).toFixed(2)} €</p>
                </div>
                <div className="cartSection removeWrap">
                  <button
                    className="cart-button"
                    title={t("cart.removefromcart")}
                    onClick={() => dispatch(removeItem({ id: item.id }))}
                  >
                    x
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="cart-button"
          onClick={() => dispatch(clearCart())}
        >
          {t("cart.clearcart")}
        </button>
      </div>

      <div className="promoCode">
        <label htmlFor="promo">{t("cart.promoCode")}</label>
        <input type="text" name="promo" placeholder="Enter Code" />
        <a href="#" className="btn"></a>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            {t("cart.totalItems")}: {itemsCount}
            <span className="label">{t("cart.subtotal")}</span>
            <span className="value">{formatCurrency(subTotal)} €</span>
          </li>
          <li className="totalRow">
            <span className="label">{t("cart.shipping")}</span>
            <span className="value">{formatCurrency(SHIPPING_COST)} €</span>
          </li>
          <li className="totalRow">
            <span className="label">{t("cart.vat")}</span>
            <span className="value">{formatCurrency(totalVAT)} €</span>
          </li>
          <li className="totalRow final">
            <span className="label">{t("cart.total")}</span>
            <span className="value">{formatCurrency(grandTotal)} €</span>
          </li>
          <li className="totalRow">
            <a href="/checkout" className="btn continue">{t("cart.checkout")}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};



  /*
  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};
*/



Cart.propTypes = {
  language: PropTypes.string.isRequired,
};

export default Cart;
