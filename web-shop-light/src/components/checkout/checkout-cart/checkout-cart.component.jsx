// import statements...
import PropTypes from 'prop-types';
import "./checkout-cart.styles.scss";

const CheckoutCart = ({cartStep, handleAction}) => {
    console.log("Debug CheckoutCart");


    return (
        <>
            <div className="checkout-main-content">
                {/* Prva vrstica */}
                components: CheckoutCart
                { <p>Glavna vsebina</p>}





            </div>
     

            <div className="checkout-navigation">
            
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            handleAction( "shipping");
                        }}
                    >Naslov za dostavo</a>
            </div>
        </>

    );
};

CheckoutCart.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}

export default CheckoutCart;