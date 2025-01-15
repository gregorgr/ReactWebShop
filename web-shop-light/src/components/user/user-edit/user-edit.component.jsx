import { useState , useContext, useEffect} from 'react';
//import axios from 'axios';
//import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
//import UserSidebar from './user-sidebar.component.js';
import { LanguageContext } from '../../../context/language-context/language-context';

import './user-edit.styles.scss';

//import apiClient from '../../../services/client/apiClient';
import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { getUserData, updateUserData } from './../../../services/apiService'; 
// './apiService';

const UserEdit = ({ }) => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const { user, token } = useAuth();
  const [userData, setUserData] = useState(null);

  //const [userData, setUserData] = useState(null);
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

  console.log("UserEdit 1");
  console.log(user);
  



  useEffect(() => {
    if (!token || !user) return;
    console.log("UserEdit 2");
    console.log(user);
    /*
    // Simulate data fetching
    setTimeout(() => {
      setUserData(demoUserData);
    }, 500); // Simulated delay
    */  
    const fetchData = async () => {
      try {
        const data = await getUserData(token, user);
        console.log(data);
        data.pwd = data.pwd || 'a123';
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();

  }, [token, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /*
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...userData.userAddresses];
    updatedAddresses[index][name] = value;
    setUserData((prevState) => ({
      ...prevState,
      userAddresses: updatedAddresses,
    }));
  };
*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      console.log('Updated User Data:', userData);
      const udateteUserResponse = await updateUserData(token, user, userData);
      console.log('Updated User Data: udateteUserresponse:', udateteUserResponse);

    } catch (error) {
      console.error(t("EditUser.updateUserDataError"), error);
    }

  };

  if (!userData) return <div>Loading...</div>;




  
    return (
      <div className="user-form">
      <h1>{t("EditUser.title")}</h1>
      <p>{t("user.helouser")} {user}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">{t("EditUser.username")}</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            disabled
          />
        </div>
        {
        /*
        <div className="form-row">
          <label>Role:</label>
          <input
            type="text"
            name="userRole"
            value={userData.userRole}
            onChange={handleInputChange}
          />
        </div>
          */
        }
        <div className="form-row">
          <label  className="form-label">{t("EditUser.firstName")}:</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
            placeholder={t("EditUser.firstName")}
          />
        </div>
        <div className="form-row">
          <label  className="form-label">{t("EditUser.lastName")}</label>
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
            placeholder={t("EditUser.lastName")}
          />
        </div>
        <div className="form-row">
          <label className='form-label'>{t("EditUser.phone")}:</label>
          <input
            type="text"
            name="userRole"
            value={userData.userRole}
            onChange={handleInputChange}
            placeholder={t("EditUser.phone")}
          />
        </div>
        <div className="form-row">

          <label  className="form-label">{t("EditUser.email")}:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder={t("EditUser.email")}
          />
        </div>
     

  
        <button type="submit" className='form-button save-button'>{t("EditUser.savechanges")}</button>
      </form>
    </div>
  

    );
  };
UserEdit.propTypes = {
 // username : PropTypes.string.isRequired, // language mora biti string
  //setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};


export default UserEdit;