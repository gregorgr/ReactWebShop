import React from 'react';
import PropTypes from 'prop-types';
import './cart.styles.scss';

const Cart = ({ language }) => {
  const texts = {
    en: {
      title: 'Your Cart',
      message: 'Review your cart details.',
      continueShopping: 'Continue Shopping',
      promoCode: 'Have A Promo Code?',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      total: 'Total',
      checkout: 'Checkout',
    },
    sl: {
      title: 'Vaša košarica',
      message: 'Preglejte podrobnosti vaše košarice.',
      continueShopping: 'Nadaljujte z nakupovanjem',
      promoCode: 'Imate promocijsko kodo?',
      subtotal: 'Vmesni seštevek',
      shipping: 'Poštnina',
      tax: 'Davek',
      total: 'Skupaj',
      checkout: 'Na blagajno',
    },
  };


  const cart = [
    {
      id: 1,
      name: 'Item Name 1',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
      itemNumber: '#QUE-007544-001',
      quantity: 3,
      price: 5.0,
      inStock: true,
    },
    {
      id: 2,
      name: 'Item Name 2',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
      itemNumber: '#QUE-007544-002',
      quantity: 2,
      price: 15.0,
      inStock: true,
    },
    {
      id: 3,
      name: 'Item Name 3',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
      itemNumber: '#QUE-007544-003',
      quantity: 1,
      price: 25.0,
      inStock: false,
    },
  ];

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const subtotal = calculateTotal();
  const shipping = 5.0;
  const tax = 4.0;
  const total = (parseFloat(subtotal) + shipping + tax).toFixed(2);

  return (
    <div className="wrap cf">
      <h1 className="projTitle">Responsive Table<span>-Less</span> Shopping Cart</h1>
      <div className="heading cf">
        <h1>{texts[language].title}</h1>
        <a href="#" className="continue">{texts[language].continueShopping}</a>
      </div>
      <div className="cart">
        <ul className="cartWrap">
          {cart.map((item, index) => (
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
                    x ${item.price.toFixed(2)}
                  </p>
                  <p className={`stockStatus ${item.inStock ? '' : 'out'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div className="prodTotal cartSection">
                  <p>${(item.quantity * item.price).toFixed(2)}</p>
                </div>
                <div className="cartSection removeWrap">
                  <a href="#" className="remove">x</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="promoCode">
        <label htmlFor="promo">{texts[language].promoCode}</label>
        <input type="text" name="promo" placeholder="Enter Code" />
        <a href="#" className="btn"></a>
      </div>

      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            <span className="label">{texts[language].subtotal}</span>
            <span className="value">${subtotal}</span>
          </li>
          <li className="totalRow">
            <span className="label">{texts[language].shipping}</span>
            <span className="value">${shipping.toFixed(2)}</span>
          </li>
          <li className="totalRow">
            <span className="label">{texts[language].tax}</span>
            <span className="value">${tax.toFixed(2)}</span>
          </li>
          <li className="totalRow final">
            <span className="label">{texts[language].total}</span>
            <span className="value">${total}</span>
          </li>
          <li className="totalRow">
            <a href="#" className="btn continue">{texts[language].checkout}</a>
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
