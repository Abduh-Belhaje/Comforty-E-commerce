ALTER TABLE catalog.reviews
ALTER COLUMN review_id SET DEFAULT nextval('catalog.review_seq');



-----------------------------------------------------
-- View for showing all chairs with their first image
-----------------------------------------------------


CREATE OR REPLACE VIEW catalog.getAllChairs AS 
WITH rankedImages AS (
	SELECT name , image_url ,
		RANK() OVER(PARTITION BY name ORDER BY image_id)
	FROM catalog.images
)

SELECT C.name,C.description,C.status, I.image_url,C.price
FROM catalog.chairs C
INNER JOIN rankedImages I
ON C.name = I.name 
WHERE I.rank = 1
ORDER BY created_at ASC;




select * from catalog.getAllChairs

-------------- -----------------------------------
-- View for showing the 4 recent added product
-- -----------------------------------------------


CREATE OR REPLACE VIEW catalog.getRecentChairs AS 
WITH rankedImages AS (
	SELECT name , image_url ,
		RANK() OVER(PARTITION BY name ORDER BY image_id)
	FROM catalog.images
)

SELECT C.name,C.description,C.status,I.image_url,C.price
FROM catalog.chairs C
INNER JOIN rankedImages I
ON C.name = I.name 
WHERE I.rank = 1
ORDER BY created_at DESC
LIMIT 4;






------------------------
--------------------------- Function to get Chair info with and its all images
------------------------

CREATE TYPE catalog.chair_info_type AS (
    name VARCHAR,
    description VARCHAR,
    status VARCHAR,
    color VARCHAR,
    height VARCHAR,
    weight VARCHAR,
    discount VARCHAR,
    image_url VARCHAR,
	price INT,
	width VARCHAR,
	rate NUMERIC
);


CREATE OR REPLACE FUNCTION catalog.get_Chair_info(chair_name VARCHAR)
RETURNS SETOF catalog.chair_info_type AS $$
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
$$ LANGUAGE plpgsql


select * from catalog.get_Chair_info('Patio%20Chairs')


-------------
---------------- Func to Fetch chairs by category
-------------


CREATE TYPE catalog.chairs_type AS (
    name VARCHAR,
    description VARCHAR,
    status VARCHAR,
    image_url VARCHAR,
	price INT
);


CREATE OR REPLACE FUNCTION catalog.get_chairs_by_category(ctg VARCHAR)
RETURNS SETOF catalog.chairs_type AS $$
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
$$ LANGUAGE plpgsql







-----------------------------------------------------------------------
--------------------- Get Reviews comments and rate -------------------


-- Tables : chairs , reviews , users , user_profile
-- Attributes : imge_url , comment , rate , first_name , last_name

CREATE OR REPLACE FUNCTION catalog.get_reviews(chairName VARCHAR)
RETURNS TABLE(
	first_name VARCHAR ,
	last_name VARCHAR,
	comment VARCHAR,
	rating NUMERIC,
	picture_url VARCHAR
	) AS $$
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
$$ LANGUAGE plpgsql



-------------------------------------------------------------------|
--------------- proc for adding a new review ----------------------|
-------------------------------------------------------------------|



CREATE OR REPLACE PROCEDURE catalog.add_new_review(
    userEmail VARCHAR,
    chairName VARCHAR, 
    rate INT, 
    cmt VARCHAR
)
LANGUAGE plpgsql AS $$ 
DECLARE
    userID INT;
    chairID INT;
BEGIN
    -- Fetch the user ID from the users table
    SELECT id INTO userID FROM accounts.users WHERE email = userEmail;
    
    -- Fetch the chair ID from the chairs table using chairName
    SELECT chair_id INTO chairID FROM catalog.chairs WHERE name = chairName;
    
    -- Insert a new review into the reviews table
    INSERT INTO catalog.reviews (user_id, chair_id, rating, comment, created_at)
    VALUES (userID, chairID, rate, cmt, NOW());

EXCEPTION
    -- Catch 'no data found' for users or chairs
    WHEN NO_DATA_FOUND THEN
        RAISE EXCEPTION 'No data found. User with email: % or Chair with name: % does not exist', userEmail, chairName;
        
    -- Catch unique violation error (e.g., duplicate reviews)
    WHEN UNIQUE_VIOLATION THEN
        RAISE EXCEPTION 'A review by this user for this chair already exists';

    -- Generic catch for other errors, but provide more context
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Operation failed. Error: %', SQLERRM;
END; $$;



------- Trigger for users table to auto-create a user_profile record



-----------------------------------------------------------------------------
-------------------------- Handle status -----------------------------------
-- change the status of New chairs after 3 days

CREATE OR REPLACE PROCEDURE catalog.change_chair_status()
LANGUAGE plpgsql AS $$ 
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN SELECT chair_id , status ,created_at  FROM catalog.chairs 
	LOOP
		IF rec.status = 'NEW' AND EXTRACT(day FROM AGE(NOW(), rec.created_at)) > 3 THEN
			UPDATE catalog.chairs SET status = 'AVAILABLE' WHERE chair_id = rec.chair_id;
		END IF;
	END LOOP;
END; $$


