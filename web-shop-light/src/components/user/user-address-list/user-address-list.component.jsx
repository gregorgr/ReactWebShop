import  { useContext, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom'; 
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import UserAddressListItem from "../user-address-list-item/user-address-list-item.component";
import "./user-address-list.styles.scss";

import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { getUserAddresses, updateUserAddress } from './../../../services/apiService'; 

// handleDefaultChange, handleDelete
const UserAddressList = ({enableButtons}) => {
 // import { useTranslation } from 'react-i18next';
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language; // Trenutni jezik
 // language = currentLanguage;
  const { user, token } = useAuth();
    const [addresses, setAddresses] = useState([]);



    console.log("DEBUG: UserAddressList ", addresses)
    //console.log()

    useEffect(() => {
        if (!token || !user) return;
    
        const fetchAddresses = async () => {
          try {
            const userAddresses = await getUserAddresses(token, user);
            console.log("DEBUG: UserAddressList: useEffect ")
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
    return(
        <>
        {addresses.length === 0 || addresses.every(isAddressEmpty) ? (
          <p>No addresses available.</p>
        ) : (
          addresses?.map((address, index) => {
            console.log("naslov: ", address);
            return (       <UserAddressListItem 
                key={index} 
                index={index} 
                address={address} 
                handleDefaultChange={handleDefaultChange} 
                handleDelete={handleDelete} 
                enableButtons={enableButtons}/>);
    
          })
        )}
      </>
    );
};

/*
<>
  {addresses.length === 0 || addresses.every(isAddressEmpty) ? (
    <p>No addresses available.</p>
  ) : (
    addresses.map((address, index) => (
      <UserAddressListItem
        key={index}
        index={index}
        address={address}
        handleDefaultChange={handleDefaultChange}
        handleDelete={handleDelete}
      />
    ))
  )}
</>

<UserAddressListItem 
key={index} 
index={index} 
address={address} 
handleDefaultChange={handleDefaultChange} 
handleDelete={handleDelete} />


     addresses.map((address, index) => (
           
            <>123</>
          ))
*/

export default UserAddressList;