import  { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/language-context/language-context';
import './user-addresses.styles.scss';

import UserAddressList from '../user-address-list/user-address-list.component';
import UserAddressAddForm from '../user-address-add-form/user-address-add-form.component';
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

const handleAddAddress = async (address) => {
  try {
    console.log("Inserting new address:", address);
    const updatedAddresses = await addUserAddress(token, user, address);
    setAddresses(updatedAddresses?.userAddresses || []);
    setNewAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: 0,
    });
    setShowAddForm(false);
  } catch (error) {
    console.error(t("EditUser.errorAddingAddress"), error);
  }
};



const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewAddress((prev) => ({ ...prev, [name]: value }));
};


return (
  <div className="user-address-list">
    <h2>{t("address.titleManageAddresses")}</h2>
    <h2>{t("address.existingAddresses")}</h2>
  
    <UserAddressList  />

<div className='form-add'>
<button type="button" className='save-button' onClick={() => setShowAddForm(true)}>Add New Address</button>
    
      {showAddForm && (
        <>
          <div className="add-address-form">
            <h2>Add New Address</h2>
            <UserAddressAddForm 
              address={newAddress}
              handleInputChange={handleInputChange}
              //handleAddAddress={handleAddAddress}
              //setShowAddForm={setShowAddForm}
              />
             <button type="button" className='form-button save-button' onClick={() => handleAddAddress(address)}>Save Address</button>
             <button type="button" className='form-button cancel-button' onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </>
        
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

/*

<div className="add-address-form">
          <h2>{t("address.addNewAddress")}</h2>
          <div className="form-row">
            <label className='form-label'>{t("address.AddressLine1")}:</label>
            <input
              type="text"
              name="addressLine1"
              value={newAddress.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.AddressLine2")}:</label>
            <input
              type="text"
              name="addressLine2"
              value={newAddress.addressLine2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.City")}:</label>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.State")}:</label>
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
              placeholder={t("address.State")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.PostalCode")}:</label>
            <input
              type="text"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleInputChange}
              placeholder={t("address.PostalCode")}
            />
          </div>
          <div className="form-row">
            <label className='form-label'>{t("address.Country")}:</label>
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              placeholder={t("address.Country")}
            />
          </div>

          <button type="button"  className='form-button save-button' onClick={handleAddAddress}>{t("EditUser.1")}Save Address</button>
          <button type="button"  className='form-button cancel-button' onClick={() => setShowAddForm(false)}>{t("EditUser.1")}Cancel</button>
        </div>
*/


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
    };
    
    
    const handleAddAddress2 = async (newAddress) => {
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
    console.error(t("EditUser."), error);
  }
};
    */