CREATE DATABASE bamazon_db;
use bamazon_db;

CREATE TABLE products(

item_id INTEGER(10) NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(8,2) NULL,
stock_quantity INTEGER(10) NULL,
PRIMARY KEY (item_id) 
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ('1','computer','technology','499.99','44'),
('2','camera','photography','300.00','74'),
('3','office chair','furnature','100.00','77'),
('4','tv','entertainment','239.95','60'),
('5','coffee mug','gifts','14.99','99'),
('6','flashlight','camping','10.00','18'),
('7','guitar','music','150.00','19'),
('8','trailmix','camping','10.00','40'),
('9','magnet','gifts','5.00','30'),
('10','Steam Trains of the American East DVD','entertainment','19.99','3'),
('11','backpack','camping','75.00','10'),
('12','keychain','gifts','5.50','100'),
('13','trumpet','music','149.99','10'),
('14','phone case','camping','25.00','15');

