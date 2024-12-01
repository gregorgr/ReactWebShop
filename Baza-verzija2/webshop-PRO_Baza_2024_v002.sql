CREATE DATABASE RPO2024;




DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userGUID` VARCHAR(50) NULL,
    `username` VARCHAR(255) NOT NULL,
    `user_role` INT NOT NULL,
    `firstname` VARCHAR(20) NULL DEFAULT NULL,
    `lastname` VARCHAR(20) NULL DEFAULT NULL,
    `pwd` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `user_language_id` INT DEFAULT NULL,
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `username` (`username` ASC) VISIBLE,
    INDEX `userGUID` (`userGUID` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;





DROP TABLE IF EXISTS UserSessions ;

CREATE TABLE UserSessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    `request_IP` VARCHAR(40) NULL DEFAULT NULL,
    valid_until DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;



DROP TABLE IF EXISTS Languages ;
 
CREATE TABLE Languages (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID jezika
    `code` VARCHAR(5) NOT NULL UNIQUE, -- Koda jezika (npr. 'en', 'sl')
    `code_table` VARCHAR(10) NULL DEFAULT NULL,
    `name` VARCHAR(50) NOT NULL, -- Ime jezika (npr. 'English', 'Slovene')
    `image_url` VARCHAR(255) NOT NULL,
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
  UNIQUE INDEX `idx_code_language` (`code`, `name`) -- Edinstvenost para `code` in `language_name`
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;





DROP TABLE IF EXISTS UserAddresses ;
CREATE TABLE UserAddresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    `is_default` SMALLINT UNSIGNED NULL DEFAULT '0',
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

SHOW CREATE TABLE UserAddresses;


DROP TABLE IF EXISTS VATRates;
CREATE TABLE VATRates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    vat_rate DECIMAL(5, 2) NOT NULL,
    name VARCHAR(255) NOT NULL,
     `enabled` SMALLINT UNSIGNED NULL DEFAULT '1'
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;






DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    
    `parent_id` INT DEFAULT NULL, -- Povezava na nadrejeno kategorijo (NULL za glavne kategorije)
    # `name` VARCHAR(255) NOT NULL, -- Ime kategorije
    #`description` TEXT DEFAULT NULL, -- Opis kategorije
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`parent_id`) REFERENCES Categories(`id`) ON DELETE SET NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

ALTER TABLE Categories
DROP COLUMN `name`,
DROP COLUMN `description`;

CREATE TABLE CategoryTranslations (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID prevoda kategorije
    `category_id` INT NOT NULL, -- Povezava na tabelo Categories
    `language_id` INT NOT NULL, -- Povezava na tabelo Languages
    `name` VARCHAR(255) NOT NULL, -- Prevedeno ime kategorije
    `description` TEXT DEFAULT NULL, -- Preveden opis kategorije
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum ustvarjanja prevoda
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum posodobitve prevoda
    FOREIGN KEY (`category_id`) REFERENCES Categories(`id`) ON DELETE CASCADE, -- Ob izbrisu kategorije izbriši prevode
    FOREIGN KEY (`language_id`) REFERENCES Languages(`id`) ON DELETE CASCADE, -- Ob izbrisu jezika izbriši povezane prevode
    UNIQUE (`category_id`, `language_id`) -- Preprečuje podvojene prevode za isto kategorijo in jezik
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


CREATE TABLE Categories (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID kategorije
    `parent_id` INT DEFAULT NULL, -- Povezava na nadrejeno kategorijo (NULL za glavne kategorije)
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1', -- Status kategorije (1 = aktivna)
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum ustvarjanja kategorije
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum posodobitve kategorije
    FOREIGN KEY (`parent_id`) REFERENCES Categories(`id`) ON DELETE SET NULL -- Hierarhija kategorij
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS Products ;
CREATE TABLE Products (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `sku` VARCHAR(50) UNIQUE NOT NULL, -- Šifra izdelka
    `category_id` INT NOT NULL, -- Povezava na tabelo Categories
    `subcategory_id` INT DEFAULT NULL, -- Povezava na tabelo Subcategories
    `brand` VARCHAR(100) DEFAULT NULL, -- Blagovna znamka izdelka
	`manufacturer` VARCHAR(100) DEFAULT NULL, -- Proizvajalec izdelka
	`model_number` VARCHAR(50) DEFAULT NULL, -- Model izdelka
    `main_picture_url` VARCHAR(255) DEFAULT NULL, -- URL glavne slike
    `main_product_url` VARCHAR(255) DEFAULT NULL, -- URL glavne slike
   `is_featured` BOOLEAN DEFAULT FALSE, -- Ali je izdelek označen kot "priporočen"
   -- price
    `price` DECIMAL(10, 2) NOT NULL,
    `vat_id` INT DEFAULT NULL, -- Povezava na tabelo VATRates
    `is_on_sale` BOOLEAN DEFAULT FALSE, -- Ali je izdelek v akciji
	`sale_price` DECIMAL(10, 2) DEFAULT NULL, -- Cena v akciji
	`sale_start_date` DATETIME DEFAULT NULL, -- Začetek akcije
	`sale_end_date` DATETIME DEFAULT NULL, -- Konec akcije
    -- rating
    `average_rating` DECIMAL(3, 2) DEFAULT 0.00, -- Povprečna ocena
	`number_of_reviews` INT DEFAULT 0, -- Število ocen
	`popularity` INT DEFAULT 0, -- Kazalnik priljubljenosti
    -- stock
    `item_storage` INT NOT NULL DEFAULT 0,
    `stock_status` ENUM('in_stock', 'out_of_stock', 'preorder') DEFAULT 'in_stock', -- Stanje zaloge
    `minimum_order_quantity` INT DEFAULT 1, -- Minimalna količina za naročilo
    `maximum_order_quantity` INT DEFAULT NULL, -- Maksimalna količina za naročilo (NULL = brez omejitve)
    -- visibility
    `is_visible` BOOLEAN DEFAULT TRUE,
     `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `brand` (`brand` ASC) VISIBLE,
    INDEX `category_id` (`category_id` ASC, `price` ASC) VISIBLE,
    FOREIGN KEY (`category_id`) REFERENCES Categories(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subcategory_id`) REFERENCES Categories(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`vat_id`) REFERENCES VATRates(`id`) ON DELETE SET NULL -- Povezava na tabelo VATRates
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

SHOW CREATE TABLE Products;



DROP TABLE IF EXISTS ProductTranslations;

CREATE TABLE ProductTranslations (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID prevoda
    `product_id` INT NOT NULL, -- Povezava na tabelo Products
    `language_id` INT NOT NULL, -- Povezava na tabelo Languages (ID jezika)
    `name` VARCHAR(255) NOT NULL, -- Ime izdelka v določenem jeziku
    `description` TEXT, -- Opis izdelka v določenem jeziku
    `status` INT NOT NULL DEFAULT 0, -- Status prevoda (npr. 0 = neobjavljen, 1 = objavljen)
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum dodajanja prevoda
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum zadnje posodobitve
    FOREIGN KEY (`product_id`) REFERENCES Products(`id`) ON DELETE CASCADE, -- Če je izdelek izbrisan, izbriši tudi prevode
    FOREIGN KEY (`language_id`) REFERENCES Languages(`id`) ON DELETE CASCADE, -- Povezava na tabelo Languages
    UNIQUE (`product_id`, `language_id`) -- Prepreči podvojene prevode za isti izdelek in jezik
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;




DROP TABLE IF EXISTS ProductDescriptionTypes ;
CREATE TABLE ProductDescriptionTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL, -- Examples: 'short', 'long',
    `enabled` SMALLINT UNSIGNED NULL DEFAULT '1'
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS ProductDescriptions;
CREATE TABLE ProductDescriptions (
 id INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID opisa
    product_id INT NOT NULL, -- Povezava na tabelo Products
    language_id INT NOT NULL, -- Povezava na tabelo Languages
    description TEXT NOT NULL, -- Opis izdelka
    description_type_id INT NOT NULL, -- Vrsta opisa (npr. kratki ali dolgi opis)
    INDEX `product_id` (`product_id` ASC) VISIBLE,
    INDEX `language_id` (`language_id` ASC) VISIBLE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE, -- Izbris izdelka izbriše tudi opise
    FOREIGN KEY (language_id) REFERENCES Languages(id) ON DELETE CASCADE, -- Izbris jezika izbriše tudi opise
    FOREIGN KEY (description_type_id) REFERENCES ProductDescriptionTypes(id) ON DELETE CASCADE -- Povezava na vrste opisov
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;






DROP TABLE IF EXISTS ProductPictures;
CREATE TABLE ProductPictures (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID slike
    `parent_picture_id` INT DEFAULT NULL, -- Povezava na matično sliko za različne velikosti
    `product_id` INT NOT NULL, -- Povezava na izdelek
    `language_id` INT NOT NULL, -- Povezava na tabelo Languages (ID jezika)
    `picture_url` VARCHAR(255) NOT NULL, -- URL slike
    `alt` VARCHAR(255) DEFAULT NULL, -- Alternativno besedilo za SEO in dostopnost
    `title` VARCHAR(255) DEFAULT NULL, -- Naslov slike
    `description` TEXT DEFAULT NULL, -- Opis slike
    `picture_type` ENUM('thumbnail', 'medium', 'full') DEFAULT 'full', -- Tip slike
    `is_default` BOOLEAN DEFAULT FALSE, -- Označuje, ali je slika privzeta za izdelek
    `sort_order` INT DEFAULT 0, -- Vrstni red prikaza slik
     `enabled` SMALLINT UNSIGNED NULL DEFAULT '1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum dodajanja slike
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum zadnje posodobitve
    FOREIGN KEY (`product_id`) REFERENCES Products(`id`) ON DELETE CASCADE, -- Povezava na tabelo izdelkov
    FOREIGN KEY (`parent_picture_id`) REFERENCES ProductPictures(`id`) ON DELETE SET NULL, -- Hierarhija slik
    INDEX (`product_id`), -- Indeks za hitro iskanje po izdelku
    INDEX (`is_default`), -- Indeks za iskanje privzetih slik
    INDEX (`sort_order`), -- Indeks za razvrščanje slik
    INDEX (`picture_type`) -- Indeks za iskanje po tipu slike
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS ProductReviews;
CREATE TABLE ProductReviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    review_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS OrderStatuses;
CREATE TABLE OrderStatuses (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `status_name` VARCHAR(50) NOT NULL, -- Ime statusa
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS OrderShippingMethods;
CREATE TABLE OrderShippingMethods (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `method_name` VARCHAR(50) NOT NULL, -- Ime dostavne metode
    `price` DECIMAL(10, 2) DEFAULT 0.00, -- Strošek dostave
    `estimated_delivery_time` VARCHAR(100) DEFAULT NULL, -- Ocena časa dostave
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID naročila
    `user_id` INT DEFAULT NULL, -- Povezava na registriranega uporabnika (NULL za goste)
    ` OrderShippingMethod` VARCHAR(100) NOT NULL, -- Ime dostavne metode
    `customer_name` VARCHAR(255) NOT NULL, -- Ime naročnika
    `customer_email` VARCHAR(255) NOT NULL, -- Email naročnika
    `customer_phone` VARCHAR(20) DEFAULT NULL, -- Telefonska številka naročnika
    `shipping_address` TEXT NOT NULL, -- Naslov za dostavo
    `billing_address` TEXT DEFAULT NULL, -- Naslov za račun (lahko drugačen od dostave)
    `order_status_id` INT NOT NULL, -- Povezava na tabelo OrderStatuses
    `customer_notes` TEXT DEFAULT NULL, -- Opombe kupca
    `total_amount` DECIMAL(10, 2) NOT NULL, -- Skupni znesek naročila
    `vat_amount` DECIMAL(10, 2) DEFAULT 0.00, -- DDV
    `discount_amount` DECIMAL(10, 2) DEFAULT 0.00, -- Popust
    `payment_method` ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery') DEFAULT 'credit_card', -- Način plačila
    `shipping_id` INT DEFAULT NULL, -- Sklic na tabelo s podatki o dostavi
    `shipping_tracking_code` VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum naročila
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Zadnja posodobitev
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`) ON DELETE SET NULL, -- Če je uporabnik izbrisan, ostanejo podatki
    FOREIGN KEY (`order_status_id`) REFERENCES OrderStatuses(`id`) -- Povezava na status naročila
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;



DROP TABLE IF EXISTS OrderProducts ;
CREATE TABLE OrderProducts (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID vnosa
    `order_id` INT NOT NULL, -- Povezava na tabelo Orders
    `product_id` INT NOT NULL, -- Povezava na tabelo Products (NE more biti NULL)
    `product_name` VARCHAR(255) NOT NULL, -- Ime izdelka ob času naročila
    `product_sku` VARCHAR(50) NOT NULL, -- SKU izdelka
    `quantity` INT NOT NULL, -- Količina naročenih izdelkov
    `price_per_unit` DECIMAL(10, 2) NOT NULL, -- Cena na enoto v času naročila
    `total_price` DECIMAL(10, 2) NOT NULL, -- Skupna cena za izdelek (price_per_unit * quantity)
    `vat_rate` DECIMAL(5, 2) DEFAULT 0.00, -- DDV stopnja v %
    `vat_amount` DECIMAL(10, 2) DEFAULT 0.00, -- DDV znesek za ta izdelek
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum dodajanja izdelka v naročilo
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum zadnje posodobitve
    FOREIGN KEY (`order_id`) REFERENCES Orders(`id`) ON DELETE CASCADE, -- Če je naročilo izbrisano, izbriši tudi izdelke
    FOREIGN KEY (`product_id`) REFERENCES Products(`id`) ON DELETE CASCADE -- Če je izdelek izbrisan, izbriši tudi vrstico
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;







DROP TABLE IF EXISTS Stores;
CREATE TABLE Stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    opening_hours VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    manager_name VARCHAR(255),
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum dodajanja izdelka v naročilo
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Datum zadnje posodobitve
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


DROP TABLE IF EXISTS StorePictures;
CREATE TABLE StorePictures (
   `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID slike
    `store_id` INT NOT NULL, -- Povezava na tabelo Stores
    `language_id` INT NOT NULL, -- Povezava na tabelo Languages
    `picture_url` VARCHAR(255) NOT NULL, -- URL slike
    `alt` VARCHAR(255) DEFAULT NULL, -- Alternativno besedilo za SEO in dostopnost
    `title` VARCHAR(255) DEFAULT NULL, -- Naslov slike
    `description` TEXT DEFAULT NULL, -- Opis slike
    `is_default` BOOLEAN DEFAULT FALSE, -- Označuje, ali je slika privzeta za poslovalnico
    `sort_order` INT DEFAULT 0, -- Vrstni red prikaza slik
    `picture_type` ENUM('thumbnail', 'medium', 'full') DEFAULT 'full', -- Tip slike (sličica, srednja, polna)
    `parent_picture_id` INT DEFAULT NULL, -- Povezava na matično sliko za različne velikosti
    `size` INT DEFAULT NULL, -- Velikost slike v bajtih
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum dodajanja slike
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum zadnje posodobitve
    FOREIGN KEY (`store_id`) REFERENCES Stores(`id`) ON DELETE CASCADE, -- Če je poslovalnica izbrisana, izbriši tudi slike
    FOREIGN KEY (`parent_picture_id`) REFERENCES StorePictures(`id`) ON DELETE SET NULL, -- Hierarhija slik
    INDEX (`store_id`), -- Indeks za hitro iskanje po poslovalnici
    INDEX (`is_default`), -- Indeks za hitro iskanje privzetih slik
    INDEX (`sort_order`), -- Indeks za razvrščanje slik
    INDEX (`picture_type`) -- Indeks za iskanje po tipu slike
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

DROP TABLE IF EXISTS StoreMessages;

CREATE TABLE StoreMessages (
    `id` INT AUTO_INCREMENT PRIMARY KEY, -- Unikatni ID sporočila
      `store_id` INT NOT NULL, -- Povezava na tabelo Stores
    `language_id` INT NOT NULL, -- Povezava na tabelo Languages (jezik sporočila)
    `user_id` INT DEFAULT NULL, -- Povezava na tabelo Users (objavitelj sporočila)
    `title` VARCHAR(255) NOT NULL, -- Naslov sporočila
    `message` TEXT NOT NULL, -- Vsebina sporočila
    `status` INT DEFAULT 0, -- Status sporočila (0 = neobjavljeno, 1 = objavljeno)
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, -- Datum ustvarjanja
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Datum zadnje posodobitve
      FOREIGN KEY (`store_id`) REFERENCES Stores(`id`) ON DELETE CASCADE, -- Če je poslovalnica izbrisana, izbriši tudi slike
    FOREIGN KEY (`language_id`) REFERENCES Languages(`id`) ON DELETE CASCADE, -- Če jezik izbrišemo, izbriši sporočila
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`) ON DELETE SET NULL -- Če je uporabnik izbrisan, nastavi user_id na NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

### POLNENJE TABEL
  
INSERT INTO Languages ( `code`, `code_table`, `name`, `image_url`, `enabled`)
VALUES
('en', 'eng', 'English', 'img/languages/en.jpg', 1), -- Angleščina
('sl', 'slv', 'Slovenščina', 'img/languages/sl.jpg', 1), -- Slovenščina
('de', 'deu', 'German', 'img/languages/de.jpg', 1);


INSERT INTO Users (
    userGUID, username, user_role, firstname, lastname, pwd, email, user_language_id, enabled
) VALUES
    ('GUID-1', 'admin', 1, 'Admin', 'User', 'hashed_password_1', 'admin@example.com', 1, 1), -- Administrator
    ('GUID-2', 'manager', 2, 'John', 'Doe', 'hashed_password_2', 'manager@example.com', 2, 1), -- Manager
    ('GUID-3', 'editor', 3, 'Jane', 'Smith', 'hashed_password_3', 'editor@example.com', 1, 1), -- Editor
    ('GUID-4', 'user1', 4, 'Alice', 'Johnson', 'hashed_password_4', 'alice@example.com', 2, 1), -- Regular user
    ('GUID-5', 'user2', 4, 'Bob', 'Brown', 'hashed_password_5', 'bob@example.com', NULL, 0); -- Disabled user
    

INSERT INTO Stores (
    `name`, address, latitude, longitude, opening_hours, contact_email, contact_phone, manager_name
) VALUES
    ('Central Store', '123 Main St, Ljubljana, Slovenia', 46.056946, 14.505751, 'Mon-Fri: 8:00-20:00, Sat: 9:00-15:00', 'central@webshop.com', '+38640123456', 'Janez Novak'),
    ('North Store', '45 North Rd, Maribor, Slovenia', 46.554650, 15.645881, 'Mon-Fri: 9:00-18:00, Sat: 10:00-14:00', 'north@webshop.com', '+38640123457', 'Marija Kranjc'),
    ('South Store', '78 South Ave, Koper, Slovenia', 45.548058, 13.730187, 'Mon-Sun: 10:00-22:00', 'south@webshop.com', '+38640123458', 'Aljoša Vidmar'),
    ('East Store', '34 East Blvd, Celje, Slovenia', 46.236017, 15.267707, 'Mon-Fri: 8:00-19:00, Sat: 8:00-12:00', 'east@webshop.com', '+38640123459', 'Bojan Horvat'),
    ('West Store', '90 West Str, Nova Gorica, Slovenia', 45.954441, 13.649173, 'Mon-Fri: 7:00-19:00, Sat: 7:00-13:00', 'west@webshop.com', '+38640123460', 'Katja Tomc');

    

INSERT INTO StorePictures (
    `store_id`, `language_id`, `picture_url`, `alt`, `title`, `description`, `is_default`, `sort_order`, `picture_type`, `size`
) VALUES
    (1, 1, 'img/stores/central.jpg', 'Image of Central Store', 'Central Store', 'A beautiful image of the Central Store.', TRUE, 1, 'full', 204800), -- Central Store
    (2, 1, 'img/stores/north.jpg', 'Image of North Store', 'North Store', 'A beautiful image of the North Store.', TRUE, 1, 'full', 204800), -- North Store
    (3, 1, 'img/stores/south.jpg', 'Image of South Store', 'South Store', 'A beautiful image of the South Store.', TRUE, 1, 'full', 204800), -- South Store
    (4, 1, 'img/stores/east.jpg', 'Image of East Store', 'East Store', 'A beautiful image of the East Store.', TRUE, 1, 'full', 204800), -- East Store
    (5, 1, 'img/stores/west.jpg', 'Image of West Store', 'West Store', 'A beautiful image of the West Store.', TRUE, 1, 'full', 204800); -- West Store



INSERT INTO StoreMessages (
    `store_id`, `language_id`, `user_id`, `title`, `message`, `status`
) VALUES
    -- Central Store
    (1, 1, 1, 'Welcome to Central Store', 'We are delighted to have you visit our Central Store. Enjoy great deals!', 1),
    (1, 2, 1, 'Central Store Hours', 'Our Central Store is open daily from 8:00 to 20:00.', 1),

    -- North Store
    (2, 1, 2, 'North Store Announcement', 'Join us at our North Store for exclusive discounts this week!', 1),
    (2, 1, 2, 'Parking Information', 'Free parking is available at North Store for all visitors.', 1),
    (2, 2, NULL, 'North Store Opening', 'North Store opens at 9:00 on weekdays and 10:00 on weekends.', 0),

    -- South Store
    (3, 1, 3, 'South Store Update', 'Our South Store has extended hours this weekend!', 1),
    (3, 2, 1, 'New Arrivals in South Store', 'Discover our new arrivals this month at South Store.', 1),

    -- East Store (brez sporočil)
    
    -- West Store
    (5, 1, 4, 'Special Offer in West Store', 'Get up to 50% off selected items in West Store!', 1),
    (5, 2, 4, 'West Store Summer Hours', 'West Store is now open earlier during the summer season.', 1);
