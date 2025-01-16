// import statements...
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import "./order-item.styles.scss";

const OrderItem = ({ order }) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language; 

    return (
        <div className="order-item">
        {/* Order Head */}
        <div className="order-head d-flex justify-content-between">
          <div>
          <h3>{t('order.title', { id: order.id })}</h3>
          <p><strong>{t('order.date')}:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
          <p><strong>{t('order.status')}:</strong> {t(`order.status_${order.status || 'PENDING'}`)}</p>
          </div>
        </div>
  
        {/* Order Details in Columns */}
        <div className="row order-details">
          {/* First Column */}
            <div className="col-md-3">
                <h5>{t("order.shippingBilling")}</h5>
                <p><strong>{t("order.customerName")}:</strong> {order.customerName}</p>
                <p><strong>{t("order.email")}:</strong> {order.customerEmail}</p>
                <p><strong>{t("order.phone")}:</strong> {order.customerPhone}</p>
                <p><strong>{t("order.shippingAddress")}:</strong> {order.shippingAddress}</p>
                <p><strong>{t("order.billingAddress")}:</strong> {order.billingAddress}</p>
                <p><strong>{t("order.shippingMethod")}:</strong> {order.orderShippingMethod}</p>

            </div>
  
          {/* Second Column */}
          <div className="col-md-3">
            <h5>{t("checkout.payment")}:</h5>
            <p><strong>{t("order.paymentMethod")}:</strong> {order.paymentMethod}</p>
            <p><strong>{t("order.totalAmount")}:</strong> {order.totalAmount} €</p>
            <p><strong>{t("order.vatAmount")}:</strong> {order.vatAmount} €</p>
            <p><strong>{t("order.discountAmount")}:</strong> {order.discountAmount} €</p>
           
          </div>
  
          {/* Third Column */}
          <div className="col-md-3">
            <h5>{t("order.customerNotes")}:</h5>
            {order.customerNotes && <p><strong>Notes:</strong> {order.customerNotes}</p>}
          </div>
        </div>
  
        {/* Products Section */}
        <div className="order-products mt-4">
          <h5>Products</h5>
          {
           // console.log("OrderItem: order.orderProducts", order.orderProducts)
          }

          {order.orderProducts.length > 0 ? (
              <div className="product-table">
       
                    <div className="product-table-header d-flex">
                <div className="col"><strong>{t('order.productTableHeaders.index')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.sku')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.productName')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.quantity')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.pricePerUnit')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.totalPrice')}</strong></div>
                <div className="col"><strong>{t('order.productTableHeaders.vatRate')}</strong></div>
                </div>

 
              {order.orderProducts.map((product, index) => (
                <div key={index} className="product-table-row d-flex">
                  <div className="col">{index + 1}</div>
                  <div className="col">{product.productName}</div>
                  <div className="col">{product.productName}</div>
                  <div className="col">{product.quantity}</div>
                  <div className="col">{product.pricePerUnit} €</div>
                  <div className="col">{product.totalPrice} €</div>
                  <div className="col">{product.vatRate}%</div>
                </div>
              ))}
            </div>
            
          ) : (
            <p>{t('order.noProducts')}</p>
          )}
        </div>
      </div>
    );
  };

  OrderItem.propTypes = {
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      customerEmail: PropTypes.string.isRequired,
      customerPhone: PropTypes.string.isRequired,
      shippingAddress: PropTypes.string.isRequired,
      billingAddress: PropTypes.string.isRequired,
      orderShippingMethod: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      vatAmount: PropTypes.number.isRequired,
      discountAmount: PropTypes.number.isRequired,
      customerNotes: PropTypes.string,
      orderProducts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          pricePerUnit: PropTypes.number.isRequired,
          totalPrice: PropTypes.number.isRequired,
          vatRate: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

export default OrderItem;