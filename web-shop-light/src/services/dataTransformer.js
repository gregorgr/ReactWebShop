import { categories } from './categories/categories.component.jsx';

export const transformProductData = (products) => {
    //return products.map(index, transformProduct);
    return products.map((product, index) => transformProduct(index, product));
};

export const mergeProductFromList = (product, productsNewData) => {
    // Poišči produkt v novem seznamu po ID
    const newProductData = productsNewData.find((newProduct) => newProduct.id === product.id);

    if (newProductData) {
        // Združi obstoječi produkt z novimi podatki
        return {
            ...product, // Obstoječi podatki
            ...newProductData, // Novi podatki prepišejo obstoječe
            vat_rate: 22, // Vedno nastavi na 22
        };
    }

    // Če ustreznega novega produkta ni, vrni obstoječ produkt
    return {
        ...product,
        vat_rate: 22, // Še vedno nastavi na 22, če novi podatki manjkajo
    };
};

export  const mergeProductFull = (product, newProduct) => {
    // Preverimo, če sta produkt in novi podatki veljavni
    if (!product || !newProduct || !newProduct.id) {
      console.error("Invalid input: product or newProduct is missing or invalid.", { product, newProduct });
      return product;
    }
  
    // Prepišemo obstoječi produkt z novimi podatki
    if (product.id === newProduct.id) {
      return {
        ...product,
        ...newProduct,
        itemStorage: newProduct.itemStorage ,//|| product.category, // Posodobimo kategorijo
        item_stock: newProduct.itemStorage ,//|| product.category, // Posodobimo kategorijo
        title: newProduct.name ,
        category: newProduct.categoryName,//|| product.category, // Posodobimo kategorijo
        description: newProduct.shortDescription// || product.description, // Posodobimo opis
      };
    }
  }


  
export const mergeProducts= (products, productNewData) => {
    // Pretvori `products` v mapo za hitrejši dostop po ID
    const productMap = new Map(products.map((product) => [product.id, product]));

    // Posodobi ali doda produkte iz novih podatkov
    // Posodobi ali dodaj produkte iz `productData`
    productNewData.forEach((newProduct) => {
        if (productMap.has(newProduct.id)) {
            // Prepiši obstoječi produkt z novimi podatki
            const existingProduct = productMap.get(newProduct.id);
            productMap.set(newProduct.id, { ...existingProduct, ...newProduct });
        } 
    });

    // Vrni združen seznam produktov
    return Array.from(productMap.values());
};


export const mergeProducts1= (products, productNewData) => {
    console.log("DataTransforemer: mergeProducts: ", productNewData);
    // Pretvori `products` v mapo za hitrejši dostop po ID
    const productMap = new Map(products.map((product) => [product.id, product]));
   // console.log("productMap: ", productMap);
    // Posodobi ali doda produkte iz novih podatkov
   // Posodobi ali dodaj produkte iz `productData`

   productNewData.forEach((newProduct) => {
    console.log("novID", newProduct);
   });

   productNewData.forEach((newProduct) => {
    console.log("newProduct: ", newProduct);
    
    if (productMap.has(newProduct.id)) {


        // Prepiši obstoječi produkt z novimi podatki
        const existingProduct = productMap.get(newProduct.id);
        console.log("existingProduct: ", existingProduct);
       // if (newProduct.id==1){
       //     console.log("FOUND existingProduct: ", existingProduct, newProduct.itemStorage);
       // }else{
      //      console.log("nop ", newProduct);
     //   }
        
        productMap.set(newProduct.id, {
            ...existingProduct, // Obstoječi podatki
            ...newProduct, // Novi podatki prepišejo obstoječe
            vat_rate: 22, // Vedno nastavi na 22
            itemStorage: newProduct.itemStorage ?? existingProduct.itemStorage, // Vedno posodobi iz `productNewData`
            item_stock: newProduct.item_stock ?? existingProduct.item_stock, // Vedno posodobi iz `productNewData
            translations: {
                ...existingProduct.translations, // Obstoječi prevodi
                ...newProduct.translations, // Novi prevodi prepišejo obstoječe
            },
        });
    } else {
        // Dodaj nov produkt in inicializiraj zahtevane vrednosti
        productMap.set(newProduct.id, {
            ...newProduct,
            vat_rate: 22, // Vedno nastavi na 22
            itemStorage: newProduct.itemStorage ?? 0, // Privzeta vrednost, če ni na voljo
            item_stock: newProduct.item_stock ?? 0, // Privzeta vrednost, če ni na voljo
            translations: newProduct.translations || { en: {}, sl: {} }, // Privzete prevodne vrednosti
        });
    }
});

    // Vrni združen seznam produktov
    return Array.from(productMap.values());
};

export const transformProduct = (index, product) => {
   // console.log("transformProduct: ", product);
    const translations = {
        en: {},
        sl: {},
    };
    //shortDescription
    // longDescriptions
    // categoryNames
    // Preoblikuj prevedene kategorije

    if (product.name) {
        translations.name = product.name || "x"; // en
        translations.title = product.name|| "x"; // sl
    }

       // Prevedene kategorije
    if (product.categoryNames) {
        translations.en.category = product.categoryNames["1"] || ""; // en
        translations.sl.category = product.categoryNames["2"] || ""; // sl
    }

    // Prevedeni kratki opisi
    if (product.shortDescriptions) {
        translations.en.description = product.shortDescriptions["1"] || ""; // en
        translations.sl.description = product.shortDescriptions["2"] || ""; // sl
    }

    // Prevedeni dolgi opisi
    if (product.longDescriptions) {
        translations.en.longDescription = product.longDescriptions["1"] || ""; // en
        translations.sl.longDescription = product.longDescriptions["2"] || ""; // sl
    }

    const matchedCategory = categories.find(
        (cat) => cat.category === product.categoryNames?.["2"] // Slovenski prevod kategorije
    );

    // Določi category_id na podlagi ujemanja ali pusti null, če ujemanja ni
    const categoryId = matchedCategory ? matchedCategory.id : 99;

    // Vrni preoblikovan produkt
    return {
        id: index+1, //ok
        category: translations.sl.category || "", // Slovenski prevod kategorije
        category_id: categoryId,
        name: product.name || "", // Slovenski naslov
        title: product.name || "", // Slovenski naslov
        image: product.mainPictureUrl,
        description: translations.sl.description || "", // Slovenski opis
        longDescription: translations.sl.longDescription || "", // Slovenski dolg opis
        price: product.price,//ok
        vat_rate: product.vat?.vatRate || 0,
        averageRating: product.averageRating,
        numberOfReviews: product.numberOfReviews,
        itemStorage: product.itemStorage,
        item_stock: product.stockStatus === "in_stock" ? 1 : 0,
        producer: product.manufacturer,
        product_rate: product.averageRating >= 4.5 ? 5 : Math.floor(product.averageRating),
        original_product_url: product.mainProductUrl,
        translations,
    };
    // Vrni preoblikovan objekt
    /*
    return {
        id: product.id,
        category: product.category?.categoryTranslations?.find(ct => ct.language === "sl")?.name || "",
        category_id: product.categoryId,
        title: product.productTranslations?.find(pt => pt.language === "sl")?.name || "",
        image: product.mainPictureUrl,
        description: product.productDescriptions?.find(pd => pd.language === "sl")?.description || "",
        longDescription: product.productDescriptions?.find(pd => pd.language === "sl")?.description || "",
        price: product.price,
        vat_rate: product.vat?.vatRate || 0,
        averageRating: product.averageRating,
        numberOfReviews: product.numberOfReviews,
        itemStorage: product.itemStorage,
        item_stock: product.stockStatus === "in_stock" ? 1 : 0,
        producer: product.manufacturer,
        product_rate: product.averageRating >= 4.5 ? 5 : Math.floor(product.averageRating),
        original_product_url: product.mainProductUrl,
        translations,
    };*/
};


