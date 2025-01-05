import React, {  useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes, { element } from 'prop-types';
import { useTranslation } from 'react-i18next';
import './language-navigator.styles.scss';

// import sloIcon from '../../assets/flagSlo.png';
// import enIcon from '../../assets/flagUsa.png';

const LanguageNavigator = () => {
  const { i18n } = useTranslation(); // Pridobite i18n iz useTranslation
   // const [currentLanguage, setCurrentLanguage] = useState({});
    //const [newlanguage, setLanguage] = useState('en'); // Privzeti jezik
    const currentLanguage = i18n.language; // Trenutni jezik
    const currentTranslation = {
        en: ['Slovensko', 'Go to your shopping cart'],
        sl: ['English', 'Pojdi v svojo košarico'],
        de: ['German', 'Pojdi v svojo košarico'],
      };
/*
      const toggleLanguage1 = (selectedLanguage) => {
        if (language !== selectedLanguage) {
          setLanguage(selectedLanguage);
        }
      };*/
       // Funkcija za spremembo jezika
       const toggleLanguage = (selectedLanguage, event) => {
        event.preventDefault(); // Prepreči privzeto vedenje (če je potrebno)
        event.stopPropagation(); // Prepreči bubbling
        console.log(`Switching language to: ${selectedLanguage}`);
        if (i18n.language !== selectedLanguage) {
          i18n.changeLanguage(selectedLanguage)
            .then(() => console.log('Language changed successfully!'))
            .catch((err) => console.error('Error changing language:', err));
        }
      };
       /*
  const toggleLanguage = (selectedLanguage) => {
    console.log(`Switching language to: ${selectedLanguage}`);
    if (i18n.language !== selectedLanguage) {
      i18n.changeLanguage(selectedLanguage); // Spremenite jezik z i18n.changeLanguage
    }
  };
*/
        // 3. Uporaba useEffect (npr. za lokalno shranjevanje ali logiko ob spremembi jezika)
   //   useEffect(() => {
   //     console.log(`Language changed to: ${language}`);
   //     // Lahko shranimo jezik v localStorage
   //     localStorage.setItem('language', language);
   //   }, [language]); // useEffect se požene vsakič, ko se spremeni 'language'
  // <li onClick={() => handleLanguageChange('sl')}>
  // 4. Funkcija za spreminjanje jezika
  /*
    const handleLanguageChange = (newLanguage) => {
      setLanguage(newLanguage); // Posodobimo stanje jezika
    };

    useEffect(() => {
      setCurrentLanguage(currentTranslation[language][0]);
    }, [language]);


    še ena varianta:
    <li onClick={this.handleCheck.bind(this)} data-id="1">
    https://forum.freecodecamp.org/t/react-onclick-get-li-clicked-solved/68112
*/
    return (
        <>
        <div className="nav-wrapper">
            <div className="sl-nav">

                <ul>
                  <li><b>{currentTranslation[currentLanguage][0]}</b> 
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                      <div className="triangle"></div>
                      <ul>
 
                      <li >
                              <i className="sl-flag flag-sl" 
                             >
                                <div id="sl" style={{ pointerEvents: 'none' }}></div>
                              </i> 
                              <button onClick={(e) => toggleLanguage('sl',e)}><span  >Slovensko</span></button>
                          </li>
                          <li >                              
                            <i className="sl-flag flag-usa">
                                <div id="en" style={{ pointerEvents: 'none' }}></div>
                              </i> 
                        
                              <button onClick={(e) => toggleLanguage('en',e)}><span>English</span></button>
                          </li>
                          


                    </ul>
                  </li>
                </ul>
            </div>
        </div>

       

      </>
    );
  };
/*



   <div className="nav-wrapper">
            <div className="sl-nav">

                <ul>
                  <li><b>{currentTranslation[currentLanguage][0]}</b> 
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                      <div className="triangle"></div>
                      <ul>
                          <li onClick={() => toggleLanguage('sl')}>
                              <i className="sl-flag flag-sl" 
                              onClick={() => toggleLanguage('sl')}>
                                <div id="sl"></div>
                              </i> 
                              <span className="active" onClick={() => toggleLanguage('sl')}>Slovensko</span>
                          </li>
                          <li onClick={() => toggleLanguage('en')}>
                              <i className="sl-flag flag-usa" onClick={() => toggleLanguage('en')}><div id="en"></div></i> 
                              <span onClick={() => toggleLanguage('en')}>English</span>
                          </li>
             
                    </ul>
                  </li>
                </ul>
            </div>
        </div>

           <li onClick={() => toggleLanguage('de')}>
                            <i className="sl-flag flag-de"><div id="de"></div></i> 
                            <span className="active">German</span>
                        </li>
  LanguageNavigator.propTypes = {
    language: PropTypes.string.isRequired, // language mora biti string
    setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
  };*/
  
  export default LanguageNavigator;


  /*

 <ul className='language' style={{ display: 'flex', listStyle: 'none', gap: '1rem', alignItems: 'center', padding: 0 }}>

        <li
          onClick={() => toggleLanguage('en')}
          style={{
            cursor: 'pointer',
            fontWeight: language === 'en' ? 'bold' : 'normal',
            textDecoration: language === 'en' ? 'underline' : 'none',
          }}
        ><img src={enIcon} className='flag'/>
          English
        </li>
        <li
          onClick={() => toggleLanguage('sl')}
          style={{
            cursor: 'pointer',
            fontWeight: language === 'sl' ? 'bold' : 'normal',
            textDecoration: language === 'sl' ? 'underline' : 'none',
          }}
        ><img src={sloIcon} className='flag'/>
          Slovensko
        </li>
      </ul>



        <ul>

            <li>            Jezik            </li>
      </ul>
 <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', alignItems: 'center', padding: 0 }}>
          <li>
            <FontAwesomeIcon icon={faGlobe} size="lg" />
          </li>
          <li
            onClick={() => toggleLanguage('en')}
            style={{
              cursor: 'pointer',
              fontWeight: language === 'en' ? 'bold' : 'normal',
              textDecoration: language === 'en' ? 'underline' : 'none',
            }}
          >
            English
          </li>
          <li
            onClick={() => toggleLanguage('sl')}
            style={{
              cursor: 'pointer',
              fontWeight: language === 'sl' ? 'bold' : 'normal',
              textDecoration: language === 'sl' ? 'underline' : 'none',
            }}
          >
            Slovensko
          </li>
        </ul>
  */