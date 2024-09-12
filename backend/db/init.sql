
-- creating the Database schemas 

DROP SCHEMA IF EXISTS public;

CREATE SCHEMA IF NOT EXISTS accounts;

CREATE SCHEMA IF NOT EXISTS orders;

CREATE SCHEMA IF NOT EXISTS catalog;

SET search_path TO accounts , orders , catalog ;
