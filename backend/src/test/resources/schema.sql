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
    email VARCHAR(255) UNIQUE
);


CREATE SEQUENCE IF NOT EXISTS accounts.users_seq
    START WITH 1
    INCREMENT BY 1;


-- Categories Table

CREATE TABLE IF NOT EXISTS catalog.categories (
    ctg_id BIGINT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    name VARCHAR(255),
    descpcrition VARCHAR(255)
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
    height NUMERIC(4,2),
    weight NUMERIC(4,2),
    discount NUMERIC(4,2),
    descpcrition VARCHAR(255)
);


CREATE SEQUENCE IF NOT EXISTS catalog.chair_seq
    START WITH 1
    INCREMENT BY 1;
