import React from 'react';

const Product = ({ language }) => {
  const texts = {
    en: { title: 'Product Details', message: 'Find more about this product.' },
    sl: { title: 'Podrobnosti o izdelku', message: 'Izvedite več o tem izdelku.' },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};

export default Product;