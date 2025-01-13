// import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import "./user-address-add-form.styles.scss";

const UserAddressAddForm = ({ newAddress, handleInputChange, handleAddAddress, setShowAddForm }) => {
    return(
        <div className="add-address-form">
        <h2>Add New Address</h2>
        <div className="form-row">
          <label className='form-label'>Address Line 1:</label>
          <input
            type="text"
            name="addressLine1"
            value={newAddress.addressLine1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
          />
        </div>
        <div className="form-row">
          <label className='form-label'>Address Line 2:</label>
          <input
            type="text"
            name="addressLine2"
            value={newAddress.addressLine2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
          />
        </div>
        <div className="form-row">
          <label className='form-label'>City:</label>
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            placeholder="City"
          />
        </div>
        <div className="form-row">
          <label className='form-label'>State:</label>
          <input
            type="text"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            placeholder="State"
          />
        </div>
        <div className="form-row">
          <label className='form-label'>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
          />
        </div>
        <div className="form-row">
          <label className='form-label'>Country:</label>
          <input
            type="text"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
        </div>
  
        <button type="button" className='form-button save-button' onClick={handleAddAddress}>Save Address</button>
        <button type="button" className='form-button cancel-button' onClick={() => setShowAddForm(false)}>Cancel</button>
      </div>
    );
};

export default UserAddressAddForm;