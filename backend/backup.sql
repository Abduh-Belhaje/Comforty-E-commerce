--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "comfortyDB";




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:D8+3qK+pI4x4/xcsjkC4pA==$ri9KsPvjyJIZgZ897w2RbS+t2fh+yBp/a9m+K1I5pHo=:LC/B67KvFdSY29i3luzWJD8eJ47xGcm1lOEJ+N01bNU=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "comfortyDB" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: comfortyDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "comfortyDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "comfortyDB" OWNER TO postgres;

\connect "comfortyDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: accounts; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA accounts;


ALTER SCHEMA accounts OWNER TO postgres;

--
-- Name: catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA catalog;


ALTER SCHEMA catalog OWNER TO postgres;

--
-- Name: orders; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA orders;


ALTER SCHEMA orders OWNER TO postgres;

--
-- Name: chair_info_type; Type: TYPE; Schema: catalog; Owner: postgres
--

CREATE TYPE catalog.chair_info_type AS (
	name character varying,
	description character varying,
	status character varying,
	color character varying,
	height character varying,
	weight character varying,
	discount character varying,
	image_url character varying,
	price integer,
	width character varying,
	rate numeric
);


ALTER TYPE catalog.chair_info_type OWNER TO postgres;

--
-- Name: chairs_type; Type: TYPE; Schema: catalog; Owner: postgres
--

CREATE TYPE catalog.chairs_type AS (
	name character varying,
	description character varying,
	status character varying,
	image_url character varying,
	price integer
);


ALTER TYPE catalog.chairs_type OWNER TO postgres;

--
-- Name: get_chair_info(character varying); Type: FUNCTION; Schema: catalog; Owner: postgres
--

CREATE FUNCTION catalog.get_chair_info(chair_name character varying) RETURNS SETOF catalog.chair_info_type
    LANGUAGE plpgsql
    AS $$
BEGIN

	RETURN QUERY
	SELECT C.name,C.description,C.status,C.color,C.height,
			C.weight,C.discount , I.image_url, C.price,C.width ,R.rate
	FROM catalog.chairs C
	INNER JOIN catalog.images I
	ON C.name = I.name 
	INNER JOIN (
		SELECT chair_id , ROUND(AVG(rating)) AS rate FROM catalog.reviews GROUP BY chair_id
	) R
	ON C.chair_id = R.chair_id
	WHERE C.name = chair_name;
	
END;
$$;


ALTER FUNCTION catalog.get_chair_info(chair_name character varying) OWNER TO postgres;

--
-- Name: get_chairs_by_category(character varying); Type: FUNCTION; Schema: catalog; Owner: postgres
--

CREATE FUNCTION catalog.get_chairs_by_category(ctg character varying) RETURNS SETOF catalog.chairs_type
    LANGUAGE plpgsql
    AS $$
DECLARE 
	ctgID INT ;
BEGIN
	-- SELECT THE CATEGORY ID WITH THE GIVEN NAME
	SELECT ctg_id INTO ctgID FROM catalog.categories WHERE name = ctg;

	-- SELECT ALL THE CHAIRS WITH THE GITTEN ID
	RETURN QUERY
	SELECT C.name,C.description,C.status,I.image_url ,C.price
	FROM catalog.chairs C
	INNER JOIN (
			SELECT name , image_url ,
				RANK() OVER(PARTITION BY name ORDER BY image_id ASC)
			FROM catalog.images
	) I
	ON C.name = I.name
	WHERE C.ctg_id = ctgID AND I.rank = 1;
	
END;
$$;


ALTER FUNCTION catalog.get_chairs_by_category(ctg character varying) OWNER TO postgres;

--
-- Name: get_reviews(character varying); Type: FUNCTION; Schema: catalog; Owner: postgres
--

CREATE FUNCTION catalog.get_reviews(chairname character varying) RETURNS TABLE(first_name character varying, last_name character varying, comment character varying, rating numeric, picture_url character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE 
	chairID INT;
BEGIN
	SELECT chair_id INTO chairID FROM catalog.chairs WHERE name = chairName;
	
	RETURN QUERY
	SELECT U2.first_name , U2.last_name ,R.comment , ROUND(R.rating)::NUMERIC , U2.picture_url 
	FROM catalog.reviews R
	INNER JOIN catalog.chairs C
	ON R.chair_id = C.chair_id
	INNER JOIN (
		SELECT U1.id , U1.first_name , U1.last_name , P.picture_url
		FROM accounts.users U1
		INNER JOIN accounts.user_profile P
		ON U1.id = P.user_id
	) U2
	ON R.user_id = U2.id 
	WHERE R.chair_id = chairID;
END;
$$;


ALTER FUNCTION catalog.get_reviews(chairname character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user_profile; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.user_profile (
    profile_id bigint NOT NULL,
    address character varying(255),
    city character varying(255),
    country character varying(255),
    created_at timestamp(6) without time zone NOT NULL,
    phone_number character varying(255),
    picture_url character varying(255),
    status character varying(255) NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE accounts.user_profile OWNER TO postgres;

--
-- Name: user_profile_seq; Type: SEQUENCE; Schema: accounts; Owner: postgres
--

CREATE SEQUENCE accounts.user_profile_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE accounts.user_profile_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.users (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['CUSTOMER'::character varying, 'ADMIN'::character varying])::text[])))
);


ALTER TABLE accounts.users OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: accounts; Owner: postgres
--

CREATE SEQUENCE accounts.users_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE accounts.users_seq OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.categories (
    ctg_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE catalog.categories OWNER TO postgres;

--
-- Name: categories_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.categories_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE catalog.categories_seq OWNER TO postgres;

--
-- Name: chair_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.chair_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE catalog.chair_seq OWNER TO postgres;

--
-- Name: chairs; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.chairs (
    chair_id bigint NOT NULL,
    color character varying(255) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    ctg_id bigint NOT NULL,
    description character varying(255) NOT NULL,
    discount character varying(255),
    height character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    weight character varying(255) NOT NULL,
    price integer,
    width character varying(255)
);


ALTER TABLE catalog.chairs OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.images (
    image_id bigint NOT NULL,
    image_url character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE catalog.images OWNER TO postgres;

--
-- Name: getallchairs; Type: VIEW; Schema: catalog; Owner: postgres
--

CREATE VIEW catalog.getallchairs AS
 WITH rankedimages AS (
         SELECT images.name,
            images.image_url,
            rank() OVER (PARTITION BY images.name ORDER BY images.image_id) AS rank
           FROM catalog.images
        )
 SELECT c.name,
    c.description,
    c.status,
    i.image_url,
    c.price
   FROM (catalog.chairs c
     JOIN rankedimages i ON (((c.name)::text = (i.name)::text)))
  WHERE (i.rank = 1)
  ORDER BY c.created_at;


ALTER VIEW catalog.getallchairs OWNER TO postgres;

--
-- Name: getrecentchairs; Type: VIEW; Schema: catalog; Owner: postgres
--

CREATE VIEW catalog.getrecentchairs AS
 WITH rankedimages AS (
         SELECT images.name,
            images.image_url,
            rank() OVER (PARTITION BY images.name ORDER BY images.image_id) AS rank
           FROM catalog.images
        )
 SELECT c.name,
    c.description,
    c.status,
    i.image_url,
    c.price
   FROM (catalog.chairs c
     JOIN rankedimages i ON (((c.name)::text = (i.name)::text)))
  WHERE (i.rank = 1)
  ORDER BY c.created_at DESC
 LIMIT 4;


ALTER VIEW catalog.getrecentchairs OWNER TO postgres;

--
-- Name: image_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.image_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE catalog.image_seq OWNER TO postgres;

--
-- Name: review_seq; Type: SEQUENCE; Schema: catalog; Owner: postgres
--

CREATE SEQUENCE catalog.review_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE catalog.review_seq OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.reviews (
    review_id bigint NOT NULL,
    chair_id integer NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    rating integer NOT NULL,
    user_id integer NOT NULL,
    comment character varying(255)
);


ALTER TABLE catalog.reviews OWNER TO postgres;

--
-- Name: stock; Type: TABLE; Schema: catalog; Owner: postgres
--

CREATE TABLE catalog.stock (
    chair_id bigint NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE catalog.stock OWNER TO postgres;

--
-- Name: order_details; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.order_details (
    order_item_id bigint NOT NULL,
    chair_id integer NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    order_id integer NOT NULL,
    price real NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE orders.order_details OWNER TO postgres;

--
-- Name: order_details_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_details_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orders.order_details_seq OWNER TO postgres;

--
-- Name: order_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.order_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orders.order_seq OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.orders (
    order_id bigint NOT NULL,
    order_date timestamp(6) without time zone NOT NULL,
    total_amount double precision NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE orders.orders OWNER TO postgres;

--
-- Name: payment; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.payment (
    p_id bigint NOT NULL,
    amount double precision NOT NULL,
    order_id integer NOT NULL,
    p_method character varying(255) NOT NULL,
    payment_date timestamp(6) without time zone NOT NULL,
    CONSTRAINT payment_p_method_check CHECK (((p_method)::text = ANY ((ARRAY['PAYPAL'::character varying, 'CREDIT_CARD'::character varying])::text[])))
);


ALTER TABLE orders.payment OWNER TO postgres;

--
-- Name: payment_seq; Type: SEQUENCE; Schema: orders; Owner: postgres
--

CREATE SEQUENCE orders.payment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE orders.payment_seq OWNER TO postgres;

--
-- Name: shopping_cart; Type: TABLE; Schema: orders; Owner: postgres
--

CREATE TABLE orders.shopping_cart (
    user_id bigint NOT NULL,
    chair_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE orders.shopping_cart OWNER TO postgres;

--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.user_profile (profile_id, address, city, country, created_at, phone_number, picture_url, status, user_id) FROM stdin;
1	\N	\N	\N	2024-09-08 10:58:33.7734	\N	\N	ACTIVE	1
2	\N	\N	\N	2024-09-08 10:58:54.980045	\N	\N	ACTIVE	2
3	\N	\N	\N	2024-09-08 10:59:03.785237	\N	\N	ACTIVE	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.users (id, created_at, email, first_name, last_name, password, role) FROM stdin;
1	2024-09-09 12:47:07.717	abdo@gmail.com	abdo	belhaje	$2a$10$cAM9U6uWKO8RaAv3MXPmIuieTeAuoTDkT/V2fLXGz4DECpsXTEfqC	CUSTOMER
2	2024-09-09 13:23:22.881	ali@gmail.com	ali	ouarigh	$2a$10$Et359.CL5jFkBnwCcTNYNurmHwNyxqvmMjjkw7onCcUMyzVRUYC.C	CUSTOMER
3	2024-09-09 13:23:34.933	reda@gmail.com	reda	lamiini	$2a$10$wdGsUHAvPvxl5DqZJkMkbOzJsdi6jHbusHq46Sh9QLYcUJ8dRvV.K	CUSTOMER
4	2024-09-09 18:56:10.608	ilyas@gmail.com	ilyas	akhoumach	$2a$10$D6f.wNvK4tG8tD9FudZHcOmYcGgPK/4Xm0E1RPIzLpyhPbvEj4mGm	CUSTOMER
5	2024-09-09 18:59:22.844	anouar@gmail.com	anouar	ferras	$2a$10$Txf9Pgp8E86P/WopvilUeO.8Fs5hdijxhaj5Z0HA0i4TpsCsnjfVm	CUSTOMER
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.categories (ctg_id, created_at, description, name) FROM stdin;
1	2024-09-02 19:59:47.680988	Designed to provide comfort and support for long hours of work.	Office
2	2024-09-02 19:59:47.680988	Luxurious chairs often made from leather and designed for high-level executives.	Dining
3	2024-09-02 19:59:47.680988	Chairs that can be easily folded and stored, ideal for small spaces or additional seating.	Healthcare
4	2024-09-02 19:59:47.680988	Chairs that recline backward and often have a footrest, providing maximum relaxation.	Outdoor
5	2024-09-02 19:59:47.680988	Chairs designed to support children while studying or doing homework.	Living Room
\.


--
-- Data for Name: chairs; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.chairs (chair_id, color, created_at, ctg_id, description, discount, height, name, status, weight, price, width) FROM stdin;
1	Black	2024-09-03 23:44:14.829	1	Designed to provide comfort and support for long hours of work.	0	107 cm	Ergonomic Chair	NEW	59 cm	300	42 cm
4	Sky Blue	2024-09-04 14:51:07.517	1	Simple, often smaller chairs meant for short-duration tasks or as general-purpose office seating.	0	107 cm	Task Chairs	NEW	59 cm	300	42 cm
6	Green	2024-09-04 15:01:30.834	4	Portable, foldable chairs suitable for camping and outdoor activities.	0	107 cm	Camping Chairs	NEW	59 cm	300	42 cm
2	Velvet Dark Grey	2024-09-03 23:57:38.092	4	 Chairs that recline backward and often have a footrest, providing maximum relaxation.	0	107 cm	Recliners Chair	NEW	59 cm	470	45 cm
3	Light Grey	2024-09-04 13:30:31.041	1	Luxurious chairs often made from leather and designed for high-level executives.	0	107 cm	Executive Chairs	NEW	59 cm	350	45 cm
5	Padded Textilene Gray	2024-09-04 14:56:45.033	4	Chairs designed specifically for outdoor use, often made from weather-resistant materials.	0	107 cm	Patio Chairs	NEW	59 cm	400	45 cm
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.images (image_id, image_url, name) FROM stdin;
1	https://s3.amazonaws.com/comfortyawsbucket/1725403490191_A12HGduPhlL._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg	Ergonomic Chair
2	https://s3.amazonaws.com/comfortyawsbucket/1725403498918_814Iq8-ir5L._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg	Ergonomic Chair
3	https://s3.amazonaws.com/comfortyawsbucket/1725403499491_814Iq8-ir5L._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg	Ergonomic Chair
4	https://s3.amazonaws.com/comfortyawsbucket/1725403500041_81%2B8-BRe7CL._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg	Ergonomic Chair
5	https://s3.amazonaws.com/comfortyawsbucket/1725404258134_71hc6xdHgCL._AC_SX679_.jpg	Recliners Chair
6	https://s3.amazonaws.com/comfortyawsbucket/1725404259514_7196SoZzU5L._AC_SX679_.jpg	Recliners Chair
7	https://s3.amazonaws.com/comfortyawsbucket/1725404259854_81pnYZtp8gL._AC_SX679_.jpg	Recliners Chair
8	https://s3.amazonaws.com/comfortyawsbucket/1725404260287_61VqqkVrKZL._AC_SX679_.jpg	Recliners Chair
9	https://s3.amazonaws.com/comfortyawsbucket/1725453031336_71GkbXmfJvL._AC_SX679_.jpg	Executive Chairs
10	https://s3.amazonaws.com/comfortyawsbucket/1725453033482_81KQcGpEVtL._AC_SX679_.jpg	Executive Chairs
11	https://s3.amazonaws.com/comfortyawsbucket/1725453033940_71WUYH3uVBL._AC_SX679_.jpg	Executive Chairs
12	https://s3.amazonaws.com/comfortyawsbucket/1725457867677_81qG2zrJToL._AC_SX679_.jpg	Task Chairs
13	https://s3.amazonaws.com/comfortyawsbucket/1725457869264_71C8B6gll3L._AC_SX679_.jpg	Task Chairs
14	https://s3.amazonaws.com/comfortyawsbucket/1725457869728_71-fik20RhL._AC_SX679_.jpg	Task Chairs
15	https://s3.amazonaws.com/comfortyawsbucket/1725458205398_91-tug9BpFL._AC_SX679_.jpg	Patio Chairs
16	https://s3.amazonaws.com/comfortyawsbucket/1725458206437_917I9yzcllL._AC_SX679_.jpg	Patio Chairs
17	https://s3.amazonaws.com/comfortyawsbucket/1725458206891_91kkNySugQL._AC_SX679_.jpg	Patio Chairs
18	https://s3.amazonaws.com/comfortyawsbucket/1725458490856_61gdKNppP2L._AC_SX569_.jpg	Camping Chairs
19	https://s3.amazonaws.com/comfortyawsbucket/1725458491627_61gv1HXfMaL._AC_SX569_.jpg	Camping Chairs
20	https://s3.amazonaws.com/comfortyawsbucket/1725458491884_61HZhl9EOTL._AC_SX569_.jpg	Camping Chairs
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.reviews (review_id, chair_id, created_at, rating, user_id, comment) FROM stdin;
1	1	2024-09-06 21:59:49.262296	4	1	This icon pack is just what I need for my latest project. There s an icon for just about anything I could ever need. Love the playful look!
2	2	2024-09-06 22:00:09.782505	4	1	This icon pack is just what I need for my latest project. There s an icon for just about anything I could ever need. Love the playful look!
3	3	2024-09-06 22:00:29.04378	5	1	This icon pack is just what I need for my latest project. There s an icon for just about anything I could ever need. Love the playful look!
4	4	2024-09-06 22:00:37.42053	5	1	This icon pack is just what I need for my latest project. There s an icon for just about anything I could ever need. Love the playful look!
5	5	2024-09-06 22:00:44.905567	5	1	This icon pack is just what I need for my latest project. There s an icon for just about anything I could ever need. Love the playful look!
6	6	2024-09-06 22:01:53.208799	3	2	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
7	5	2024-09-06 22:02:00.491135	3	2	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
8	1	2024-09-06 22:02:11.464683	3	2	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
9	2	2024-09-06 22:02:18.856574	3	2	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
10	2	2024-09-06 22:02:30.86453	4	3	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
11	1	2024-09-06 22:02:39.18618	4	3	Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: catalog; Owner: postgres
--

COPY catalog.stock (chair_id, quantity) FROM stdin;
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: orders; Owner: postgres
--

COPY orders.order_details (order_item_id, chair_id, created_at, order_id, price, quantity) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: orders; Owner: postgres
--

COPY orders.orders (order_id, order_date, total_amount, user_id) FROM stdin;
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: orders; Owner: postgres
--

COPY orders.payment (p_id, amount, order_id, p_method, payment_date) FROM stdin;
\.


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: orders; Owner: postgres
--

COPY orders.shopping_cart (user_id, chair_id, created_at, quantity) FROM stdin;
\.


--
-- Name: user_profile_seq; Type: SEQUENCE SET; Schema: accounts; Owner: postgres
--

SELECT pg_catalog.setval('accounts.user_profile_seq', 1, false);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: accounts; Owner: postgres
--

SELECT pg_catalog.setval('accounts.users_seq', 5, true);


--
-- Name: categories_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.categories_seq', 1, false);


--
-- Name: chair_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.chair_seq', 6, true);


--
-- Name: image_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.image_seq', 20, true);


--
-- Name: review_seq; Type: SEQUENCE SET; Schema: catalog; Owner: postgres
--

SELECT pg_catalog.setval('catalog.review_seq', 1, false);


--
-- Name: order_details_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_details_seq', 1, false);


--
-- Name: order_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.order_seq', 1, false);


--
-- Name: payment_seq; Type: SEQUENCE SET; Schema: orders; Owner: postgres
--

SELECT pg_catalog.setval('orders.payment_seq', 1, false);


--
-- Name: users uk6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: users ukr53o2ojjw4fikudfnsuuga336; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.users
    ADD CONSTRAINT ukr53o2ojjw4fikudfnsuuga336 UNIQUE (password);


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (profile_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (ctg_id);


--
-- Name: chairs chairs_pkey; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.chairs
    ADD CONSTRAINT chairs_pkey PRIMARY KEY (chair_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: catalog; Owner: postgres
--

ALTER TABLE ONLY catalog.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (chair_id);


--
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (order_item_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (p_id);


--
-- Name: shopping_cart shopping_cart_pkey; Type: CONSTRAINT; Schema: orders; Owner: postgres
--

ALTER TABLE ONLY orders.shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (user_id);


--
-- Name: idx_chairs_name; Type: INDEX; Schema: catalog; Owner: postgres
--

CREATE INDEX idx_chairs_name ON catalog.chairs USING btree (name);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

