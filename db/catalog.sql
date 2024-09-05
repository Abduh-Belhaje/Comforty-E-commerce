select * from catalog.chairs;
select * from catalog.categories;

SELECT indexname FROM pg_indexes WHERE schemaname = 'catalog';

CREATE INDEX idx_chairs_name ON catalog.chairs(name);


-----------------------------------------------------
-- View for showing all chairs with their first image
-----------------------------------------------------


CREATE OR REPLACE VIEW catalog.getAllChairs AS 
WITH rankedImages AS (
	SELECT name , image_url ,
		RANK() OVER(PARTITION BY name ORDER BY image_id)
	FROM catalog.images
)

SELECT C.name,C.description,C.status,C.color,C.height,C.weight,C.discount , I.image_url
FROM catalog.chairs C
INNER JOIN rankedImages I
ON C.name = I.name 
WHERE I.rank = 1
ORDER BY created_at ASC;






-------------- -----------------------------------
-- View for showing the 4 recent added product
-- -----------------------------------------------


CREATE OR REPLACE VIEW catalog.getRecentChairs AS 
WITH rankedImages AS (
	SELECT name , image_url ,
		RANK() OVER(PARTITION BY name ORDER BY image_id)
	FROM catalog.images
)

SELECT C.name,C.description,C.status,C.color,C.height,C.weight,C.discount , I.image_url
FROM catalog.chairs C
INNER JOIN rankedImages I
ON C.name = I.name 
WHERE I.rank = 1
ORDER BY created_at DESC
LIMIT 4;






------------------------
--------------------------- Function to get Chair info with and its all images
------------------------
DROP TYPE catalog.chair_info_type

CREATE TYPE catalog.chair_info_type AS (
    name VARCHAR,
    description VARCHAR,
    status VARCHAR,
    color VARCHAR,
    height VARCHAR,
    weight VARCHAR,
    discount VARCHAR,
    image_url VARCHAR
);


CREATE OR REPLACE FUNCTION catalog.get_Chair_info(chair_name VARCHAR)
RETURNS SETOF catalog.chair_info_type AS $$
BEGIN

	RETURN QUERY
	SELECT C.name,C.description,C.status,C.color,C.height,C.weight,C.discount , I.image_url 
	FROM catalog.chairs C
	INNER JOIN catalog.images I
	ON C.name = I.name 
	WHERE C.name = chair_name;
	
END;
$$ LANGUAGE plpgsql






-------------
---------------- Func to Fetch chairs by category
-------------

CREATE OR REPLACE FUNCTION catalog.get_chairs_by_category(ctg VARCHAR)
RETURNS SETOF catalog.chair_info_type AS $$
DECLARE 
	ctgID INT ;
BEGIN
	-- SELECT THE CATEGORY ID WITH THE GIVEN NAME
	SELECT ctg_id INTO ctgID FROM catalog.categories WHERE name = ctg;

	-- SELECT ALL THE CHAIRS WITH THE GITTEN ID
	RETURN QUERY
	SELECT C.name,C.description,C.status,C.color,C.height,C.weight,C.discount , I.image_url 
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



select * from catalog.get_chairs_by_category('Office')
