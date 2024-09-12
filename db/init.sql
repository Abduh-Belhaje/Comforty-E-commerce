
----------------------------------------------------------
-------------------- Categories Table -------------------

INSERT INTO catalog.categories (ctg_id,name,description,created_at)
VALUES (1,'Office','Designed to provide comfort and support for long hours of work.',NOW());

INSERT INTO catalog.categories (ctg_id,name,description,created_at)
VALUES (2,'Dining','Luxurious chairs often made from leather and designed for high-level executives.',NOW());

INSERT INTO catalog.categories (ctg_id,name,description,created_at)
VALUES (3,'Healthcare','Chairs that can be easily folded and stored, ideal for small spaces or additional seating.',NOW());

INSERT INTO catalog.categories (ctg_id,name,description,created_at)
VALUES (4,'Outdoor','Chairs that recline backward and often have a footrest, providing maximum relaxation.',NOW());

INSERT INTO catalog.categories (ctg_id,name,description,created_at)
VALUES (5,'Living Room ','Chairs designed to support children while studying or doing homework.',NOW());





--------------------------------------------------------
----------------- Reviews Table ------------------------

INSERT INTO accounts.users (id,email,first_name,last_name,role,created_at) 
VALUES (3,'reda@gmail.com','REDA','LAMINI','CUSTOMER',NOW()) 
select * from catalog.reviews;
select * from catalog.chairs;
select * from accounts.users;

INSERT INTO catalog.reviews (review_id,chair_id,rating,user_id,comment,created_at) 
VALUES (11,1,4,3,'Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so its a steal at this price.'
,NOW())


