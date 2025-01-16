// import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import "./theme-navigation.styles.scss";

const ThemeNavigation = () => {
        //  import { useTranslation } from 'react-i18next';
          const { t, i18n } = useTranslation();
          const currentLanguage = i18n.language; 
          //language= currentLanguage;
    return(
        <>navigation: Theme-navigation</>
    );
};

export default ThemeNavigation;