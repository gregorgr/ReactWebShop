// import  { useContext, useState } from 'react';
//import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import "./user-address-add-form.styles.scss";

const UserAddressAddForm = ({ address,  handleInputChange }) => {
  const { t } = useTranslation();
     //handleAddAddress,  setShowAddForm 
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
            <label className='form-label'>{t("address.addressLine1")}:</label>
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.addressLine1")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.addressLine2")}:</label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.addressLine2")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.city")}:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.city")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.state")}:</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.state")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.postalCode")}:</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.postalCode")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.country")}:</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              placeholder={t("address.country")}
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