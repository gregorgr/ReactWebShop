import  { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/language-context/language-context';
import './user-addresses.styles.scss';

// import apiClient from '../../../services/client/apiClient';
import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { getUserAddresses, addUserAddress, updateUserAddress } from './../../../services/apiService'; 

//  username, addresses, handleAddressChange
const UserAddresses = () => {
   console.log("UserAddresses");
   const { language } = useContext(LanguageContext);
   const { t } = useTranslation();
   const [showAddForm, setShowAddForm] = useState(false);

    const { user, token } = useAuth();
    const [userData, setUserData] = useState(null);

    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: 0,
    });
    
    //const [userData, setUserData] = useState(null);
    /*
    const demoUserData = {
      username: 'testUser',
      userRole: 'admin',
      firstname: 'John',
      lastname: 'Doe',
      pwd: 'password123',
      email: 'john.doe@example.com',
      userAddresses: [
        {
          addressLine1: '123 Main St',
          addressLine2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          isDefault: 1,
        },
        {
          addressLine1: '456 Elm St',
          addressLine2: '',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'USA',
          isDefault: 0,
        },
      ],
    };*/

    useEffect(() => {
      if (!token || !user) return;
  
      const fetchAddresses = async () => {
        try {
          const userAddresses = await getUserAddresses(token, user);
          setAddresses(userAddresses);
        } catch (error) {
          console.error('Error fetching user addresses:', error);
        }
      };
  
      fetchAddresses();
    }, [token, user]);


    const handleDefaultChange = async (index) => {
      console.log("handleDefaultChange index="+index)
      const updatedAddresses = addresses.map((address, i) => ({
        ...address,
        isDefault: i === index ? 1 : 0,
      }));
      console.log(updatedAddresses)
      try {
        await updateUserAddress(token, user, updatedAddresses[index]);
        setAddresses(updatedAddresses);
      } catch (error) {
        console.error('Error updating default address:', error);
      }
    };


    const handleDelete = (index) => {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(updatedAddresses);
    };

    const isAddressEmpty = (address) => {
      const { addressLine1, addressLine2, city, state, postalCode, country } = address;
      return (
        [addressLine1, addressLine2, city, state, postalCode, country].every(
          (value) => typeof value === 'string' && value.trim() === ''
        )
      );
    };

   // if (!userData) return <div>Loading...</div>;
console.log(addresses.length);
console.log(addresses);

const handleAddAddress = async () => {
  try {
    console.log("insert new adress:")
    console.log(newAddress)
    const updatedAddresses = await addUserAddress(token, user, newAddress);
    setAddresses(updatedAddresses.userAddresses);
    setNewAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: 0,
    });
  } catch (error) {
    console.error('Error adding address:', error);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewAddress((prev) => ({ ...prev, [name]: value }));
};


return (
  <div className="user-address-list">
    <h2>Manage User Addresses</h2>
    <h2>Existing Addresses</h2>


    {addresses.length === 0 || addresses.every(isAddressEmpty)? (
        <p>No addresses available.</p>
      ) : (
        addresses.map((address, index) => (
          <div key={index} className="form-row form-address-row ">
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

<div className='form-add'>
<button type="button" className='save-button' onClick={() => setShowAddForm(true)}>Add New Address</button>


      {showAddForm && (
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

          <button type="button"  className='form-button save-button' onClick={handleAddAddress}>Save Address</button>
          <button type="button"  className='form-button cancel-button' onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}

      </div>
  </div>
);

};

// 
UserAddresses.propTypes = {
  // username: PropTypes.string.isRequired, // language mora biti string

};


export default UserAddresses;
