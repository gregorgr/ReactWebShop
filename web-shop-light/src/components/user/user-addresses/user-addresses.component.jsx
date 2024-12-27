
import './user-addresses.styles.scss';
import PropTypes from 'prop-types';


const UserAddresses = ({ language }) => {




    return (<>
        <h1>User Addresses</h1>
        <p>{language}</p>
    </>);

};

// 
UserAddresses.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string

};


export default UserAddresses;
