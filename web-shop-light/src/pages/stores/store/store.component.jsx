import React from 'react';

const Store = ({ language }) => {
  const texts = {
    en: { title: 'Store Details', message: 'Learn more about this store.' },
    sl: { title: 'Podrobnosti o trgovini', message: 'Izvedite več o tej trgovini.' },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};

export default Store;