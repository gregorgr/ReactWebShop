


import PropTypes from 'prop-types';

const User = ({ language }) => {
    // Teksti za večjezičnost
    const texts = {
      en: {
        title: 'User Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        submit: 'Save Information',
      },
      sl: {
        title: 'Uporabniški podatki',
        firstName: 'Ime',
        lastName: 'Priimek',
        email: 'E-poštni naslov',
        phone: 'Telefonska številka',
        submit: 'Shrani podatke',
      },
    };
  
    return (
      <div>
        <h2>{texts[language].title}</h2>
        <form>
          {/* Ime */}
          <div>
            <label>{texts[language].firstName}</label>
            <input
              type="text"
              placeholder={texts[language].firstName}
              name="firstName"
            />
          </div>
  
          {/* Priimek */}
          <div>
            <label>{texts[language].lastName}</label>
            <input
              type="text"
              placeholder={texts[language].lastName}
              name="lastName"
            />
          </div>
  
          {/* Email */}
          <div>
            <label>{texts[language].email}</label>
            <input
              type="email"
              placeholder={texts[language].email}
              name="email"
            />
          </div>
  
          {/* Telefon */}
          <div>
            <label>{texts[language].phone}</label>
            <input
              type="tel"
              placeholder={texts[language].phone}
              name="phone"
            />
          </div>
  
          {/* Gumb za oddajo */}
          <button type="submit">{texts[language].submit}</button>
        </form>
      </div>
    );
  };

User.propTypes = {
  language: PropTypes.string.isRequired, // language mora biti string
  setLanguage: PropTypes.func.isRequired, // setLanguage mora biti funkcija
};


export default User;