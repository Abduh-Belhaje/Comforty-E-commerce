-- creating the Database schemas
CREATE SCHEMA IF NOT EXISTS accounts;
CREATE SCHEMA IF NOT EXISTS orders;
CREATE SCHEMA IF NOT EXISTS catalog;

--- Users Table

CREATE TABLE IF NOT EXISTS accounts.users (
    id BIGINT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) UNIQUE
);


CREATE SEQUENCE IF NOT EXISTS accounts.users_seq
    START WITH 1
    INCREMENT BY 1;


-- Categories Table

CREATE TABLE IF NOT EXISTS catalog.categories (
    ctg_id BIGINT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    name VARCHAR(255),
    description VARCHAR(255)
);


CREATE SEQUENCE IF NOT EXISTS catalog.categories_seq
    START WITH 1
    INCREMENT BY 1;


-- Chairs Table

CREATE TABLE IF NOT EXISTS catalog.chairs (
    chair_id BIGINT NOT NULL PRIMARY KEY,
    ctg_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    name VARCHAR(255),
    picture_url VARCHAR(255),
    status VARCHAR(10),
    color VARCHAR(10),
    height VARCHAR(4),
    weight VARCHAR(4),
    width VARCHAR(4),
    price VARCHAR(4),
    discount VARCHAR(4),
    description VARCHAR(255)
);


CREATE SEQUENCE IF NOT EXISTS catalog.chair_seq
    START WITH 1
    INCREMENT BY 1;



--- Images Table
CREATE TABLE IF NOT EXISTS catalog.images (
    image_id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    image_url VARCHAR(255)
);


CREATE SEQUENCE IF NOT EXISTS catalog.image_seq
    START WITH 1
    INCREMENT BY 1;

-- View for showing all chairs with their first image


CREATE OR REPLACE VIEW catalog.getAllChairs AS 
SELECT 
    C.name,
    C.description,
    C.status,
    C.color,
    C.height,
    C.weight,
    C.discount,
    I.image_url
FROM 
    catalog.chairs C
INNER JOIN (
    SELECT 
        name, 
        image_url, 
        RANK() OVER(PARTITION BY name ORDER BY image_id) AS rank
    FROM 
        catalog.images
) I
ON C.name = I.name 
WHERE 
    I.rank = 1;



