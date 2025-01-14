import  { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Inicialno stanje košarice
const initialState = {
  items: [], // Seznam izdelkov v košarici
  total: 0,  // Skupna cena
};

// Reducer za upravljanje košarice
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':{
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      // const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      //const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);


      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Ustvarimo Context
export const CartContext = createContext();

// CartProvider za zagotavljanje stanja
export const CartProvider = ({  children, language = 'en'  }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart: state, addItemToCart, removeItemFromCart, clearCart }}>
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