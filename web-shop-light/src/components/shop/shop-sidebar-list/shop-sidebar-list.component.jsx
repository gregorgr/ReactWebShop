// import statements...
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./shop-sidebar-list.styles.scss";
import { Link } from 'react-router-dom';

const ShopSidebarList = ({titleRef, baseUrl, items}) => {
    const { t } = useTranslation();
    return (
        <>
        <h5>{t(titleRef)}2</h5>
        <ul className="list-group">
            <li className="list-group-item"> 
                <a href={baseUrl} className="text-decoration-none text-dark">
                    {t("shop.all")}  
                </a>
            </li>
            {
                items?.map((category) => (
                    <li key={category.id} className="list-group-item">
                      {category.isSelected ? (
                            <span className="selected-category">
                            {category.name} ({category.count})
                            </span>
                        ) : (
                            <Link
                            to={category.url}
                            className="text-decoration-none text-dark"
                            >
                            {category.name} ({category.count})
                            </Link>
                        )} 
                        {
                            // `${baseUrl}${encodeURIComponent(category.name)}`
                            console.log(`URL: ${category.url}`)
                        }     
                    </li>
                    )
                )
            }       
        </ul> 
        </>
    );
};

ShopSidebarList.propTypes = {
    titleRef: PropTypes.string.isRequired, // Referenca za prevod naslova
    baseUrl: PropTypes.string.isRequired, // URL za "vse"
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Ime kategorije
        count: PropTypes.number.isRequired, // Število izdelkov
        url: PropTypes.string.isRequired, // URL za kategorijo
        isSelected: PropTypes.bool, // Ali je kategorija izbrana
      })
    ).isRequired,
  };

export default ShopSidebarList;