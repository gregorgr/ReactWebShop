
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Helper function to add Bearer token to headers
const createHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});



// Helper function to check if an address is empty
const isAddressEmpty = (address) => {
  const { addressLine1, addressLine2, city, state, postalCode, country } = address;
  return (
    [addressLine1, addressLine2, city, state, postalCode, country].every(
      (value) => typeof value === 'string' && value.trim() === ''
    )
  );
};
//import axios from 'axios';
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// User API services
export const getUserData = async (token, username) => {
  const response = await axios.get(`${API_BASE_URL}/User/${username}`, createHeaders(token));
  console.log("apiService: getUserDataaddUserAddress:")
  console.log(response.data)
  return response.data;
};

export const updateUserData = async (token, username, userData) => {
  console.log("apiService: updateUserData:")
  console.log(userData);
  console.log("updateUserData:token: ", token)
  const { pwdRpt, ...rest } = userData;
  if (!userData.pwd) {
      console.log("pwd je prazen:");
      const originalData = await axios.get(`${API_BASE_URL}/User/${username}`, createHeaders(token));
      userData.pwd = originalData.pwd || 'a123';
      
      console.log("pwd: "+ userData.pwd );
  }
  console.log(userData);
  userData["PwdRpt"]= userData.pwd || 'a123';
  // userData.pwd = request.data.pwd || request.data.pwd ;
  const response = await axios.put(`${API_BASE_URL}/User/${username}`, userData, createHeaders(token));
  return response.data;
};

export const getUserAddresses = async (token, username) => {
  console.log("getUserAddresses:token: ", token)
  const response = await axios.get(`${API_BASE_URL}/User/${username}`, createHeaders(token));
  return response.data.userAddresses;
};

export const updateUserAddress = async (token, username, updatedAddress) => {
  const userData = await getUserData(token, username);
  userData.userAddresses = userData.userAddresses.map((address) =>
    address.id === updatedAddress.id ? updatedAddress : address
  );
  return updateUserData(token, username, userData);
};


export const addUserAddress = async (token, username, newAddress) => {
  console.log("apiService: addUserAddress:")
  console.log(newAddress)

  const userData = await getUserData(token, username);
  userData.pwd = userData.pwd || 'a123';
    // Filter out empty addresses
  userData.userAddresses = userData.userAddresses.filter((address) => !isAddressEmpty(address));
  // ne deluje več naslovov.
  // userData.userAddresses.push(newAddress);
  userData.userAddresses = [newAddress]; // Zamenja vse prejšnje naslove
  console.log(userData)
   // Update user data
  return updateUserData(token, username, userData);
};

// Order API services
export const getUserOrders = async (token, userId) => {
  const response = await axios.get(`${API_BASE_URL}/Order/orders-by-user-id/${userId}`, createHeaders(token));
  return response.data;
};

export const getUserOrder = async (token, orderId) => {
  const response = await axios.get(`${API_BASE_URL}/Order/${orderId}`, createHeaders(token));
  return response.data;
};

export const updateUserOrder = async (token, orderId, updatedOrder) => {
  const response = await axios.put(`${API_BASE_URL}/Order/${orderId}`, updatedOrder, createHeaders(token));
  return response.data;
};

export const insertUserOrder = async (token, newOrder) => {
  const response = await axios.post(`${API_BASE_URL}/Order`, newOrder, createHeaders(token));
  return response.data;
};
