
-- creating the Database schemas 

DROP SCHEMA public;

CREATE SCHEMA accounts;

CREATE SCHEMA orders;

CREATE SCHEMA catalog;

SET search_path TO accounts , orders , catalog ;