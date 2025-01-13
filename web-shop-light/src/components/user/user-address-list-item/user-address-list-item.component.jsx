// import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import "./user-address-list-item.styles.scss";

const UserAddressListItem = ({index, address, handleDelete, handleDefaultChange}) => {
     const { t } = useTranslation();
  console.log("DEBUG: UserAddressListItem ", address)

    return(
      <>
        <div className="form-row form-address-row">
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
                  {t("address.setAsDefault")}
                </label>
                <button type="button" className='form-button delete-button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
        </div>
      </>
    );
};

// Validacija props z PropTypes
UserAddressListItem.propTypes = {
  index: PropTypes.number.isRequired, // index mora biti število
  address: PropTypes.shape({         // address mora biti objekt z določenimi polji
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    isDefault: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired, // mora biti funkcija
  handleDefaultChange: PropTypes.func.isRequired, // mora biti funkcija
};


export default UserAddressListItem;