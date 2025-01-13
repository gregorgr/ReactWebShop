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
    const { t } = useTranslation();

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
      <h3>Add New Address</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Address Line 1:</label>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={newAddress.addressLine1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Address Line 2:</label>
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={newAddress.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>City:</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>State:</label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newAddress.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={newAddress.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newAddress.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label>
            Default:
            <input
              type="checkbox"
              checked={newAddress.isDefault === 1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, isDefault: e.target.checked ? 1 : 0 })
              }
            />
          </label>
        </div>
        <button type="submit">Add Address</button>
      </form>
    </div>
        </>
    );
};

export default UserAddressesAdd;