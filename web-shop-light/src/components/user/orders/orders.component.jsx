const Orders = ({ language }) => {
    return (
      <div>
        <h2>{language === 'sl' ? 'Naročila' : 'Orders'}</h2>
        <p>{language === 'sl' ? 'Trenutno ni naročil za prikaz.' : 'No orders to display at the moment.'}</p>
      </div>
    );
  };
  
  export default Orders;