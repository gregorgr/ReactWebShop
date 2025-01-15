import {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../context/auth-context/auth-context.utils';


const Orders = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const texts = {
    en: { title: 'Your Orders', message: 'Track your recent orders.' },
    sl: { title: 'Vaša naročila', message: 'Spremljajte vaša zadnja naročila.' },
  };
  
  if (!user) {
    return <Navigate to="/login" />;
  }

    return (
      <div>
        <h2>{t("orders.title")}</h2>
        <p>{t("login.hello")}: {user}</p>
        <p>{t("orders.empty")}</p>
      </div>
    );
  };
  
  export default Orders;