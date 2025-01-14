// import statements...
import PropTypes from 'prop-types';
import "./checkout-payment.styles.scss";

const CheckoutPayment = ({cartStep, handleAction}) => {
    return (
        <>

<div className="checkout-main-content">
                {/* Prva vrstica */}
                components: CheckoutPayment
                { <p>Glavna vsebina</p>}





            </div>


            <div className="checkout-navigation">
                <div className="nav-button step-back">
                    <a 
                    href="#" 
                    className="btn continue nav-button  step-back left" 
                    onClick={() => {
                        // e.preventDefault();
                        handleAction( "shipping");
                    }}
                        >Nazaj</a>
                </div>
                    <a 
                        href="#" 
                        className="btn continue nav-button right" 
                        onClick={() => {
                            // e.preventDefault();
                            handleAction( "finish");
                        }}
                            >Oddaj naročilo</a>
            </div>

        


       
        </>
    );
};

CheckoutPayment.propTypes = {
    cartStep: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired, // mora biti funkcija

}

export default CheckoutPayment;