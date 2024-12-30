import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context/auth-context.utils';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Validacija propov
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Zahtevano, da poskrbimo za validacijo
};

export default ProtectedRoute;
