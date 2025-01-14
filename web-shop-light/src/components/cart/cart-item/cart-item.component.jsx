import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeItem, updateQuantity} from '../../../features/cart/cartSlice.js';

import { ProductContext } from '../../../context/products/products.context.jsx';

import "./cart-item.styles.scss";

const CartItem = ({ item }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useContext(ProductContext);

    // Poiščemo izdelek v kontekstu ProductContext
  const product = products.find((prod) => prod.id === item.id);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value).replace('€', '');
  };

  // Funkcija za spremembo količine
  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
        // Posodobi količino, če je večja od 0
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      } else {
        // Odstrani element, če je količina 0 ali manj
        dispatch(removeItem({ id: item.id }));
      }
  };

  return (
    <div className="infoWrap">    
        <div className="cartSection">
           
            <div className="cart-item">
                <div className='cart-item-box'>

                    <img src={item.image} title={item.name} alt={item.name} className="itemImg" />
                </div>
                <div className='cart-item-box cart-item-content'>
                    <h3>
                      <Link to={`/shop/${encodeURIComponent(product.category)}/product/${product.id}`}>{item.name}</Link>
                      </h3>

                    <p className="itemNumber">{t("cart.productid")}: {item.id}</p>
                    <p className={`stock-status ${product?.item_stock > 0 ? '' : 'out'}`}>{product?.item_stock > 0 
                                ? t('cart.inStock', { stock: product.item_stock }) 
                            : t('cart.outOfStock')}
                    </p>
               
                </div>
                <div className='cart-item-box'>
                <div className="quantity-controls">
             
                    <div className="btn-circ" onClick={() => handleQuantityChange(-1)}>&lt;</div>
                    <span>{item.quantity}</span>
                    <div className="btn-circ" onClick={() => handleQuantityChange(1)}>&gt;</div>
                    <span>x {formatCurrency(item.price)}€ </span>
     
                </div>
                </div>
                <div className='cart-item-box'>

                <div className="prodTotal cartSection">
                    <span>= {formatCurrency(item.price * item.quantity)}€</span>
                </div>
                </div>
                <div className='cart-item-box'>
                    <div className="btn-circ btn-remove"
                                    title={t("cart.removefromcart")}
                                    onClick={() => dispatch(removeItem({ id: item.id }))}
                     >{t("cart.remove")}</div>
                </div>
                
               
            </div>
        </div>
    </div>
  );
};

export default CartItem;
