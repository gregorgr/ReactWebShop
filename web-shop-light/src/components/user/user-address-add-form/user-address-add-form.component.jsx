import  { useContext, useState } from 'react';
//import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import "./user-address-add-form.styles.scss";

const UserAddressAddForm = ({ address, handleInputChange }) => {
     // handleAddAddress, setShowAddForm 
  /*const [newAddress, setNewAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: 0,
      });

*/
    return(
        <>
        
          
          <div className="form-row">
            <label className='form-label'>Address Line 1:</label>
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>Address Line 2:</label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>City:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>State:</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              placeholder="State"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>Country:</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
          </div>
      </>
    );
};

UserAddressAddForm.propTypes = {
  address: PropTypes.arrayOf(
    PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
      isDefault: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    })
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  //handleAddAddres: PropTypes.func.isRequired,
 // setShowAddForm: PropTypes.func.isRequired,
};

export default UserAddressAddForm;