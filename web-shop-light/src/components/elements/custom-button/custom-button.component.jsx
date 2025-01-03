//import { useTranslation } from 'react-i18next';

import './cart-icon.styles.scss';
import './custom-button.styles.scss';

const CustomButton = ({
    children, 
    ...otherprops}) =>{
  //  const { t } = useTranslation();

    return (
    <button>
        {children}
    </button>);
}

export default CustomButton;
