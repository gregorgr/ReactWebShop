import { createContext, useState } from "react";


import PRODUCTS from "../../services/product/product-data.json";
/*
export const ProductSontext = createContext({

currentProduct : null,
setCurrentProduct: () => null,
});*/

export const ProductContext = createContext({});


export const ProductsProvider =({children}) => {

  //  const [currentProduct, serCurrentProduct] = useState(null);
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;


}