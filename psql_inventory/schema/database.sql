CREATE DATABASE inventory;

CREATE TABLE products (
    products_id SERIAL PRIMARY KEY,
    productname VARCHAR(255),
    productprice FLOAT,
    sku NUMERIC
);



