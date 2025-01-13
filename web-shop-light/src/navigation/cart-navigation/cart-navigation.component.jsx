import  { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
//import { removeItem, updateQuantity} from '../../features/cart/cartSlice';

//import { ProductContext } from '../../context/products/products.context.jsx';

import "./cart-navigation.styles.scss";

const CartNavigation = ({ item }) => {
   // const { t } = useTranslation();

    return(<>
      <div id="crumbs">
 
        <ul>
            <li><a href="#1"><i className="fa fa-cart-plus" aria-hidden="true"></i> Cart</a></li>
            <li><a href="#2">Dostava</a></li>
            <li><a href="#3"><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Checkout</a></li>
        </ul>
 
    </div>
    </>);

}

export default CartNavigation;