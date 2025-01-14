// import statements...
import PropTypes from 'prop-types';
import "./checkout-shipping.styles.scss";

const CheckoutShipping = ({cartStep, handleAction}) => {
    return (
        <>
        
        <div className="checkout-main-content">
                {/* Prva vrstica */}
                components: CheckoutShipping
                { <p>Glavna vsebina</p>}





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