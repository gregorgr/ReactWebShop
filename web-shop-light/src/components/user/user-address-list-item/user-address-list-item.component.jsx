// import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import "./user-address-list-item.styles.scss";

const UserAddressListItem = (addresses, handleDefaultChange, handleDelete ) => {
    
    const isAddressEmpty = (address) => {
        const { addressLine1, addressLine2, city, state, postalCode, country } = address;
        return (
          [addressLine1, addressLine2, city, state, postalCode, country].every(
            (value) => typeof value === 'string' && value.trim() === ''
          )
        );
      };

    return(
        <>
        {addresses.length === 0 || addresses.every(isAddressEmpty) ? (
          <p>No addresses available.</p>
        ) : (
          addresses.map((address, index) => (
            <div key={index} className="form-row form-address-row">
              <div className="address-details">
                <p>{address.addressLine1}, {address.addressLine2}</p>
                <p>{address.city}, {address.state}, {address.postalCode}</p>
                <p>{address.country}</p>
              </div>
              <div className="address-actions">
                <label>
                  <input
                    type="radio"
                    name="isDefault"
                    checked={address.isDefault === 1}
                    onChange={() => handleDefaultChange(index)}
                  />
                  Set as Default
                </label>
                <button type="button" className='form-button delete-button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </>
    );
};

export default UserAddressListItem;