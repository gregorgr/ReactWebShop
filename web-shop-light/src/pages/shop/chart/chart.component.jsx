import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({ language }) => {
  const texts = {
    en: { title: 'Your Chart', message: 'Review your chart details.' },
    sl: { title: 'Vaša košarica', message: 'Preglejte podrobnosti vaše košarice.' },
  };

  return (
    <div>
      <h2>{texts[language].title}</h2>
      <p>{texts[language].message}</p>
    </div>
  );
};

export default Chart;