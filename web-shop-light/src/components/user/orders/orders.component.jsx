import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../context/auth-context/auth-context.utils';

import { getOrders } from '../../../services/apiService';
import OrderItem from '../order-item/order-item.component'; 

// Kontrola za posamezno naročilo
const Orders = () => {
   // const { category, page } = useParams(); 
   const { t, i18n } = useTranslation();
   const currentLanguage = i18n.language; // Trenutni jezik

   const { user, token } = useContext(AuthContext);
   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);


   
  const texts = {
    en: { title: 'Your Orders', message: 'Track your recent orders.' },
    sl: { title: 'Vaša naročila', message: 'Spremljajte vaša zadnja naročila.' },
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchOrders = async () => {
      try {
        console.log("Orders before await getOrders(user, token)");
        const userOrders = await getOrders(user, token);
        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(t("orders.errorFetching"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, t]);

  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <p>{t("orders.loading")}</p>;
  }

  if (error) {
    return (
      <div className="orders-list">
    <p>{t("orders.empty")}</p>
    </div>);
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2>{t("orders.title")}</h2>
        <p>{t("orders.empty")}</p>
      </div>
    );
  }

  return (
    <div>
     

      <div className="orders-list">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

  
  export default Orders;