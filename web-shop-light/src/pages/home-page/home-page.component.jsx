 import { useState } from 'react';

// import React from 'react';
import PropTypes from 'prop-types';
import './home-page.styles.scss';



const Home = ({ language, categories }) => {
  const texts = {
    en: { title: 'Categories of The Month', message: 'Explore our website.' },
    sl: { title: 'Kategorije meseca', message: 'Raziščite našo spletno stran.' },
  };

  
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedData = [...categories].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    });
  
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
  

  return (
    <section className="container py-5">
        <div className="row text-center pt-3">
            <div className="col-lg-6 m-auto">
                <h1 className="h1">{texts[language].title}</h1>
                <h2></h2>
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>{texts[language].message}</p>
            </div>
        </div>
      
        <div className="row">
      <div className="col-sm-12 text-left"> 
    <div className='row '>
        {sortedData.map((item) => (
          <div key={item.id} className="col-12 col-md-4 p-5 mt-3 text-center">
          <a href="#">
              <img
                src={item.image}
                alt= {language === 'sl' ? item.category : item.translations.en.category}
                className="rounded-circle img-fluid border"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </a>
            <h5 className="mt-3 mb-3"> {language === 'sl' ? item.category : item.translations.en.category}</h5>
            <p className="mt-2">
              {language === 'sl' ? item.description : item.translations.en.description}
            </p>
            <p>
              <a className="btn btn-success" href="#">
                Go Shop
              </a>
            </p>
          </div>


        ))}
      </div></div></div>
    </section>
  );
};

Home.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
// setL
  setLanguage: PropTypes.func.isRequired, //
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      translations: PropTypes.shape({
        en: PropTypes.shape({
          category: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,

};

export default Home;

/*


      {sortedData.map((item) => (
          <div key={item.id} className="col-12 col-md-4 p-5 mt-3 text-center">
            <a href="#">
              <img
                src={item.image}
                alt={item.category}
                className="rounded-circle img-fluid border"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </a>
            <h5 className="mt-3 mb-3">{item.category}</h5>
            <p>{item.description}</p>
            <p>
              <a className="btn btn-success" href="#">
                Go Shop
              </a>
            </p>
          </div>
        ))}


*/