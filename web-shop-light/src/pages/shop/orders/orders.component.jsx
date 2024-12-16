import React from 'react';

const Orders = ({ language }) => {
  const texts = {
    en: { title: 'Your Orders', message: 'Track your recent orders.' },
    sl: { title: 'Vaša naročila', message: 'Spremljajte vaša zadnja naročila.' },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};

export default Orders;