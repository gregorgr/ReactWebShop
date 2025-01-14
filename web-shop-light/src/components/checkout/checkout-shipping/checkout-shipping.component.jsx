// import statements...
import {useState, useContext, useEffect, lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import "./checkout-shipping.styles.scss";

import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { getUserData } from './../../../services/apiService'; 
import UserAddressList from '../../user/user-address-list/user-address-list.component';
import UserAddressAddForm from '../../user/user-address-add-form/user-address-add-form.component';

const CheckoutShipping = ({cartStep, handleAction}) => {
    const { t } = useTranslation();
    const { user, token, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    const [newAddress, setNewAddress] = useState({
        nameto:'',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: 0,
      });
      
    const handleAddAddress = async (address) => {
    try {
        console.log("Inserting new address:", address);
        //const updatedAddresses = await addUserAddress(token, user, address);
        //setAddresses(updatedAddresses?.userAddresses || []);
        setNewAddress({
            nameto:'',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            isDefault: 0,
        });
       // setShowAddForm(false);
    } catch (error) {
        console.error(t("EditUser.errorAddingAddress"), error);
    }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({ ...prev, [name]: value }));
      };
      
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
            console.log("useEffect: getUserData:", data);

            setUserData(data);
            setNewAddress((prev) => ({ ...prev, ["nameto"]: data.lastname + " " + data.firstname}));

            console.log("useEffect: newAddress:",newAddress);

          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
    
      }, [token, user]);

    return (
        <>
        
        <div className="checkout-main-content">
                {/* Prva vrstica */}
            

                <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.shipping")}</h1>
                </div>

                { <p>Glavna vsebina</p>}
                <>
                    { user ? (
                            <>
                            {user}
                                <div className="form-row">
                                    <label className='form-label'>{t("address.nameto")}</label>
                                    <input
                                    type="text"
                                    name="nameto"
                                    value={newAddress.nameto}
                                    //onChange={handleInputChange}
                                    placeholder={t("address.nameto")}
                                    />
                                </div>
                                <UserAddressList  enableButtons={false}/>
                            </>
                        ):(
                            <>
                                <div className="form-row">
                                    <label className='form-label'>{t("address.nameto")}</label>
                                    <input
                                    type="text"
                                    name="nameto"
                                    value={newAddress.nameto}
                                    onChange={handleInputChange}
                                    placeholder={t("address.nameto")}
                                    />
                                </div>
                                <UserAddressAddForm 
                                    address={newAddress}
                                    handleInputChange={handleInputChange}
                                    // handleAddAddress={handleAddAddress}
                                    />
                            </>
                        )
                    }
                </>
                </div>



            </div>


            <div className="checkout-navigation">
                <div className="nav-button step-back">
                    <a 
                    href="#" 
                    className="btn continue nav-button  step-back left" 
                    onClick={() => {
                        handleAction( "cart");
                        }}>Nazaj</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            handleAction( "payment");
                        }}>Na plačilo</a>
            </div>

        </>
    );
};
CheckoutShipping.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}
export default CheckoutShipping;