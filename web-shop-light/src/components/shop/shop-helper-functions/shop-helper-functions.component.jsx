// import statements...

import "./shop-helper-functions.styles.scss";

const ShopHelperFunctions = ({product}) => {
    const {
        id,
        name,
        
        price,
        vat_rate,  
        producer,
       // original_product_url,
        itemStorage,
        categoryId, 
        categoryName,
       // image,
        mainPictureUrl,
        mainProductUrl,
        brand,  
        manufacturer,
        longDescription,
        shortDescription,
        numberOfReviews, 
        averageRating,
        rewiews

      } = product;

    return (
        <>components: ShopHelperFunctions</>
    );
};

export default ShopHelperFunctions;