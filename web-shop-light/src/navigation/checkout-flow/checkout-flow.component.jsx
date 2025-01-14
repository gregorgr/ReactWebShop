// import statements...

import "./checkout-flow.styles.scss";

const CheckoutFlow = (cartStep, setCartStep) => {
    console.log("CheckoutFlow cartStep:", cartStep)
    return (
        <>
            <p>navigation: CheckoutFlow step: </p>
            <ul className="count">
                <li className={cartStep === "cart" ? "selected" : ""}>
                    <button onClick={() => setCartStep("cart")}>Cart</button></li>
                <li className={cartStep === "shipping" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("shipping")}>Shipping</button></li>
                <li className={cartStep === "payment" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("payment")}>Payment</button></li>
                <li className={cartStep === "finish" ? "selected" : ""}>
                    <button  onClick={() => setCartStep("finish")}>Finish</button></li>
            </ul>
            <div>
            </div>
        </>
    );
};

export default CheckoutFlow;