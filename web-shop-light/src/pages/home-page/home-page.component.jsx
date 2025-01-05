import { useState } from 'react';

import { categories } from '../../services/categories/categories.component.jsx';

import PropTypes from 'prop-types';
import './home-page.styles.scss';


const Home = ({ language = 'en' }) => {

    const texts = {
        en: { title: 'Categories of The Month', message: 'Explore our website.',    gotoshop: 'Go Shop' },
        sl: { title: 'Kategorije meseca', message: 'Raziščite našo spletno stran.', gotoshop: 'V trgovino'  },
      };


      const [sortOrder, setSortOrder] = useState('asc');

      const sortedData = categories
        ? [...categories].sort((a, b) =>
            sortOrder === 'asc'
              ? a.category.localeCompare(b.category)
              : b.category.localeCompare(a.category)
          )
        : [];
    
      const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      };
// //container-fluid text-center 
// container py-5 
    return (<>
  
      <section className="container-fluid main-content shop-content">
        <div className="row text-center pt-2">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">{texts[language]?.title || 'Title'}</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>{texts[language]?.message || 'Message'}</p>
          </div>
        </div>
        <div className="row">
          {sortedData.map((item) => {
            const categoryName = language === 'sl' ? item.category : item.translations.en.category;

            
            return (<div key={item.id} className="col-12 col-md-4 p-5 mt-3 text-center">
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
             
                  <a className="btn btn-success" 
                  
                  href={`/shop/${encodeURIComponent(categoryName)}`}
                  
                  >
                    {texts[language]?.gotoshop}
                  </a>
                </p>
              </div>);
          })}
        </div>

      </section>
    </>);
};

export default Home;

/*
       <link className="btn btn-success" 
                 title={texts[language]?.gotoshop} // Tooltip za vizualne uporabnike
                 aria-label={texts[language]?.gotoshop}// Dostopna oznaka za bralnike zaslona
                 tabIndex="50" // Omogoča fok
                 to="/shop/">
                 {language} 
                </link>
*/