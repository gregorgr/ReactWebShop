import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Inicialno stanje košarice
const initialState = {
  items: [], // Seznam izdelkov v košarici
  total: 0, // Skupna cena
  shippingMethod: null, // Način dostave
  shippingAddress: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  payment: {
    method: '',
    code: '',
  },
  tax: 0, // Davek
  shippingCost: 0, // Stroški pošiljanja
  totalWithTax: 0, // Skupni znesek z davkom in pošiljanjem
  orderDate: null, // Datum oddaje naročila
};

// Reducer za upravljanje košarice
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems, total: calculateTotal(updatedItems, state.shippingCost, state.tax) };
      } else {
        const updatedItems = [...state.items, action.payload];
        return { ...state, items: updatedItems, total: calculateTotal(updatedItems, state.shippingCost, state.tax) };
      }
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: updatedItems, total: calculateTotal(updatedItems, state.shippingCost, state.tax) };
    }
    case 'SET_SHIPPING_METHOD': {
      return { ...state, shippingMethod: action.payload.text, shippingCost: action.payload.cost, total: calculateTotal(state.items, action.payload.cost, state.tax) };
    }
    case 'SET_SHIPPING_ADDRESS': {
      return { ...state, shippingAddress: action.payload };
    }
    case 'SET_PAYMENT': {
      return { ...state, payment: action.payload };
    }
    case 'SET_ORDER_DATE': {
      return { ...state, orderDate: action.payload };
    }
    case 'CLEAR_CART': {
      return initialState;
    }
    default:
      return state;
  }
};

// Funkcija za izračun skupnega zneska
const calculateTotal = (items, shippingCost, tax) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return subtotal + shippingCost + tax;
};

// Ustvarimo Context
export const CartContext = createContext();

// CartProvider za zagotavljanje stanja
export const CartProvider = ({ children, language = 'en' }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const setShippingMethod = (text, cost) => {
    dispatch({ type: 'SET_SHIPPING_METHOD', payload: { text, cost } });
  };

  const setShippingAddress = (address) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
  };

  const setPayment = (method, code) => {
    dispatch({ type: 'SET_PAYMENT', payload: { method, code } });
  };

  const setOrderDate = (date) => {
    dispatch({ type: 'SET_ORDER_DATE', payload: date });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addItemToCart,
        removeItemFromCart,
        setShippingMethod,
        setShippingAddress,
        setPayment,
        setOrderDate,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // children je zahtevan
  language: PropTypes.string, // language je opcijski
};




/*
// Privzete vrednosti
CartProvider.defaultProps = {
  language: 'en', // Privzeti jezik je angleščina
};
*/
/*


    {
      id: 3,
      name: 'Item Name 3',
      image: 'http://lorempixel.com/output/technics-q-c-300-300-4.jpg',
     // itemNumber: '#QUE-007544-003',
      quantity: 1,
      price: 25.0,
      inStock: false,
    },*/