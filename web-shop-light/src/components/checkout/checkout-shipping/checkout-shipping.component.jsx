// import statements...
import {useState, useContext, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import "./checkout-shipping.styles.scss";



import UserAddressList from '../../user/user-address-list/user-address-list.component';
import UserAddressListItem from '../../user/user-address-list-item/user-address-list-item.component';
import UserAddressAddForm from '../../user/user-address-add-form/user-address-add-form.component';

import { useDispatch } from 'react-redux'; // Uvoz Redux dispatch
import { setShippingAddress, setEmail } from '../../../features/cart-slice/cartSlice'; // Akcija za posodobitev naslova

import { useAuth } from '../../../context/auth-context/auth-context.utils';
import { getUserAddresses, getUserData } from './../../../services/apiService'; 

// import Loading from '../../loading/loading.component';

const CheckoutShipping = ({cartStep, handleAction}) => {
     // import { useTranslation } from 'react-i18next';
 const { t, i18n } = useTranslation();
 const currentLanguage = i18n.language; // Trenutni jezik
 
    const { user, token } = useAuth();
    const dispatch = useDispatch(); // Inicializacija Redux dispatc
    const [userData, setUserData] = useState(null);

    //const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({
        nameto:'',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
    /*const [newAddress, setNewAddress] = useState({
        nameto:'',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
      */



    // Pridobivanje podatkov o naslovu uporabnika
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


            const userAddresses = await getUserAddresses(token, user);
            //setAddresses(userAddresses || []); 
            setSelectedAddress(userAddresses?.[0] || null);
            
            const data = await getUserData(token, user);
            setUserData(data);
            setSelectedAddress((prev) => ({ 
                ...prev, ["nameto"]: `${data.lastname} ${data.firstname}`,
            }));
            setSelectedAddress((prev) => ({ 
                ...prev, ["email"]: `${data.email}`,
            }));
            console.log("useEffect: SelectedAddress:",selectedAddress);

          } catch (error) {
            console.error(t('checkout.errorFetchingUserData'), error);
            // console.error('Error fetching user data:', error);
          }
        };


    
        fetchData();
    
      }, [token, user, t]);
      
        // Posodobitev vnosa naslova
      const handleInputChange = (name, value) => {
        console.log("handleInputChange name, value", name, value);
        setSelectedAddress((prev) => ({ ...prev, [name]: value }));
        // console.log(selectedAddress);
      };
      /*
        const handleInputChangeOld = (e) => {
            const { name, value } = e.target;
            setSelectedAddress((prev) => ({ ...prev, [name]: value }));
        };
        */
      const loadData = async () => {
         setTimeout(() => {
         setIsLoading(false);
         }, 3000); // Pavza 3 sekunde
      };
      const handleProceedToPayment = () => {
        if (!selectedAddress.nameto || !selectedAddress.addressLine1 || !selectedAddress.city) {
            console.error('Address is incomplete.');
            return;
        }
        if (!selectedAddress.email ) {
            console.error('Email is required');
            return;
        }

        const cartData = {
          shippingAddress: selectedAddress, // Dodaj naslov
        };
        dispatch(setEmail(selectedAddress.email));
        // Posodobi naslov v Redux stanju
        dispatch(setShippingAddress(selectedAddress));

        console.log("handleProceedToPayment  selectedAddress:",selectedAddress);
        console.log('Cart Data:', cartData);
       // setIsLoading(true); 
       // loadData();
       // setIsLoading(true); 

        handleAction('payment', cartData); // Pokliči zbrane podatke in premik na plačilo

      };

/*
    const handleAddAddress = async (address) => {
        try {
            console.log("Inserting new address:", address);
            //const updatedAddresses = await addUserAddress(token, user, address);
            //setAddresses(updatedAddresses?.userAddresses || []);
            setNewAddress({
                nameto: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
            // isDefault: 0,
            });
        // setShowAddForm(false);
        } catch (error) {
            console.error(t("EditUser.errorAddingAddress"), error);
        }
    };

   */

    return (
        <>
        <div className="checkout-main-content">
            <div className="wrapx">
                <div className="heading cf">
                    <h1>{t("checkout.shipping")}</h1>
                </div>
                <div className='checkout-form'>
                    { user ? (
                            <>
                            <div className="form-row">
                                    <label className='form-label'>{t("address.nameto")}</label>
                                    <input
                                    type="text"
                                    name="nameto"
                                    value={selectedAddress?.nameto || ''}
                                    onChange={handleInputChange}
                                    placeholder={t("address.nameto")}
                                />
                            </div>
                            <div className="form-row">
                                    <label className='form-label'>{t("login.email")}</label>
                                    <input
                                    type="text"
                                    name="email"
                                    value={selectedAddress?.email || ''}
                                    //value={selectedAddress?.CustomerEmail || ''}
                                    onChange={handleInputChange}
                                    placeholder={t("login.email")}
                                />
                            </div>

                             
                            <UserAddressListItem  
                                index={0}
                                address={selectedAddress  || {}}
                                handleDelete={() => {}}
                                handleDefaultChange={() => {}}
                                // onSelectAddress={(address) => setSelectedAddress(address)}
                                enableButtons={false}/>
                            </>
                        ):(
                            <>
                                <div className="form-row">
                                    <label className='form-label'>{t("address.nameto")}</label>
                                    <input
                                    type="text"
                                    name="nameto"
                                    value={selectedAddress.nameto}
                                    onChange={handleInputChange}
                                    placeholder={t("address.nameto")}
                                    />
                                </div>
                                <div className="form-row">
                                    <label className='form-label'>{t("login.email")}</label>
                                    <input
                                    type="text"
                                    name="email"
                                    value={selectedAddress?.email || ''}
                                    //value={selectedAddress?.CustomerEmail || ''}
                                    onChange={handleInputChange}
                                    placeholder={t("login.email")}
                                />
                            </div>
                                <UserAddressAddForm 
                                    address={selectedAddress}
                                    handleInputChange={handleInputChange}
                                    // handleAddAddress={handleAddAddress}
                                    />
                            </>
                        )
                    }
                </div>
                </div>



            </div>


            <div className="checkout-navigation">
                <div className="nav-button step-back">
                    <a 
                    href="#" 
                    className="btn continue nav-button  step-back left" 
                    onClick={() => {
                        handleAction("cart");
                        }}>{t('checkout.back')}</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={handleProceedToPayment} 
                        >
                        {t('checkout.topayment')}</a>
            </div>

        </>
    );
};


CheckoutShipping.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}
export default CheckoutShipping;