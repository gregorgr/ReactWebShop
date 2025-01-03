import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../../features/cart/cartSlice';


import './cart.styles.scss';


// import { CartContext } from '../../../context/cart-context/cart-context.provider';

const Cart = ({ language }) => {
  const { t } = useTranslation();
  const { items, totalQuantity, totalAmount, totalVAT } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
// const { cart } = useContext(CartContext);


  const cartlist = [
    {
      id: 1,
      name: 'Item Name 1',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
      //itemNumber: '#QUE-007544-001',
      quantity: 3,
      price: 5.0,
      inStock: true,
    },
    {
      id: 2,
      name: 'Item Name 2',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
     // itemNumber: '#QUE-007544-002',
      quantity: 2,
      price: 15.0,
      inStock: true,
    },
    {
      id: 3,
      name: 'Item Name 3',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
     // itemNumber: '#QUE-007544-003',
      quantity: 1,
      price: 25.0,
      inStock: false,
    },
  ];
  

  const calculateTotal = () => {
    return cartlist.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const subtotal = calculateTotal();
  const shipping = 5.0;
  const tax = 4.0;
  const total = (parseFloat(subtotal) + shipping + tax).toFixed(2);

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
                    x {item.price}€
                    {
                      // x ${item.price.toFixed(2)}
                    }
                  </p>
                  <p className={`stockStatus ${item.inStock ? '' : 'out'}`}>
                    {item.item_stock>0 ? t("cart.onstock") : t("cart.outofstock")}
                  </p>
              </div>
              <div className="prodTotal cartSection">
                  <p>{(item.quantity * item.price).toFixed(2)} €</p>
                </div>
                <div className="cartSection removeWrap">
                  <button className="remove" title={t("cart.removefromcart")} onClick={() => dispatch(removeItem({ id: item.id }))}>x</button>
                </div>
            </div>
         </li>
      ))}
      </ul>
      <p>Total Items: {totalQuantity}</p>
      <p>Subtotal: {totalAmount.toFixed(2)} €</p>
      <p>VAT (22%): {totalVAT.toFixed(2)} €</p> {/* Prikaz DDV */}
      <p>Total (incl. VAT): ${(totalAmount + totalVAT).toFixed(2)}</p> {/* Skupen znesek z DDV */}
      <button onClick={() => dispatch(clearCart())}>{("cart.clearcart")}</button>
      </div>

      <div className="promoCode">
        <label htmlFor="promo">{t("cart.promoCode")}</label>
        <input type="text" name="promo" placeholder="Enter Code" />
        <a href="#" className="btn"></a>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            <span className="label">{t("cart.subtotal")}</span>
            <span className="value">${subtotal}</span>
          </li>
          <li className="totalRow">
            <span className="label">{t("cart.shipping")}</span>
            <span className="value">${shipping.toFixed(2)}</span>
          </li>
          <li className="totalRow">
            <span className="label">{t("cart.tax")}</span>
            <span className="value">${tax.toFixed(2)}</span>
          </li>
          <li className="totalRow final">
            <span className="label">{t("cart.total")}</span>
            <span className="value">${total}</span>
          </li>
          <li className="totalRow">
            <a href="#" className="btn continue">{t("cart.checkout")}</a>
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
