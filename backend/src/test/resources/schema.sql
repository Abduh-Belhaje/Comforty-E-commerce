-- creating the Database schemas
CREATE SCHEMA IF NOT EXISTS accounts;
CREATE SCHEMA IF NOT EXISTS orders;
CREATE SCHEMA IF NOT EXISTS catalog;


CREATE TABLE IF NOT EXISTS accounts.users (
    id BIGINT NOT NULL PRIMARY KEY,
    created_at TIMESTAMP,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(255),
    u_email VARCHAR(255) UNIQUE
);


CREATE SEQUENCE IF NOT EXISTS accounts.users_seq
    START WITH 1
    INCREMENT BY 1;
