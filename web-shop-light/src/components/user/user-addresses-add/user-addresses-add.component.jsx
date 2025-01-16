import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/language-context/language-context';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import "./user-addresses-add.styles.scss";

const UserAddressesAdd = ({handleAddAddress}) => {
    const { language } = useContext(LanguageContext);
     // import { useTranslation } from 'react-i18next';
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
 // language = currentLanguage;

    const [newAddress, setNewAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: 0,
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAddress(newAddress);
        setNewAddress({
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          isDefault: 0,
        });
      };
    
    return(
        <>
           <div className="user-add-address">
           <h3>{t('address.addNewAddressTitle')}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>{t('address.addressLine1')}</label>
          <input
            type="text"
            name="addressLine1"
            placeholder={t('address.addressLine1')}
            value={newAddress.addressLine1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>{t('address.addressLine2')}:</label>
          <input
            type="text"
            name="addressLine2"
            placeholder={t('address.addressLine2')}
            value={newAddress.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>{t('address.city')}:</label>
          <input
            type="text"
            name="city"
            placeholder={t('address.city')}
            value={newAddress.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>{t('address.state')}:</label>
          <input
            type="text"
            name="state"
            placeholder={t('address.state')}
            value={newAddress.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>{t('address.postalCode')}:</label>
          <input
            type="text"
            name="postalCode"
            placeholder={t('address.postalCode')}
            value={newAddress.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>{t('address.country')}:</label>
          <input
            type="text"
            name="country"
            placeholder={t('address.country')}
            value={newAddress.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>
          {t('address.default')}:
            <input
              type="checkbox"
              checked={newAddress.isDefault === 1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, isDefault: e.target.checked ? 1 : 0 })
              }
            />
          </label>
        </div>
        <button type="submit">{t('address.addAddressButton')}</button>
      </form>
    </div>
        </>
    );
};

export default UserAddressesAdd;