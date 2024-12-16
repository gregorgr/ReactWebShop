import React from 'react';

const Stores = ({ language }) => {
  const texts = {
    en: { title: 'Our Stores', message: 'Find stores near you.' },
    sl: { title: 'Naše trgovine', message: 'Poiščite trgovine v vaši bližini.' },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};

export default Stores;