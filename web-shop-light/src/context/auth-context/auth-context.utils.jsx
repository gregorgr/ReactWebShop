import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// AuthContext
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Shrani podatke o uporabniku
  const [token, setToken] = useState(null); // Shrani uporabniški token
  const [refreshToken, setRefreshToken] = useState(null); //
  // Prijava
  const login = async (username, pwd) => {
    const response = await fetch('http://localhost:5020/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pwd }),
    });

    if (response.ok) {
      const data = await response.json();

      //console.log(`Token: ${data.accessToken}`);
      //console.log(`refreshToken: ${data.refreshToken}`);
      //console.log(`User: ${username}`);
      //console.log({data});

      setToken(data.refreshToken);   //  Shranimo token
      setRefreshToken(data.refreshToken);
      setUser(username); // Shranimo uporabniške podatke, če so priloženi

    } else {
      throw new Error('Invalid login credentials');
    }
  };

  // Registracija
  const register = async (userData) => {
    const payload = { ...userData, userRole: 'navaden_uporabnik' };
    const response = await fetch('http://localhost:5020/api/Auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  };

  // Sprememba gesla
  const changePassword = async (username, oldPassword, newPassword) => {
      const payload = {
        username,
        oldPassword,
        newPassword,
      };

      const response = await fetch('http://localhost:5020/api/Auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      return response.json();
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, register, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
