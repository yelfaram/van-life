BEGIN;

DROP TABLE IF EXISTS review, rental, renter, van, owner;

DROP TYPE IF EXISTS van_types;

DROP INDEX IF EXISTS idx_email_renter;
DROP INDEX IF EXISTS idx_email_owner;

CREATE TABLE IF NOT EXISTS owner (
    owner_id serial PRIMARY KEY,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL,
    first_name VARCHAR( 30 ) NOT NULL,
    last_name VARCHAR( 30 ) NOT NULL
);

CREATE INDEX idx_email_owner ON owner(email);

CREATE TYPE van_types AS ENUM ('simple', 'rugged', 'luxury');

CREATE TABLE IF NOT EXISTS van (
    van_id serial PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR( 30 ) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR( 255 ) NOT NULL,
    type van_types NOT NULL,
    FOREIGN KEY (owner_id)
      REFERENCES owner (owner_id)
);

CREATE TABLE IF NOT EXISTS renter (
    renter_id serial PRIMARY KEY,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL,
    first_name VARCHAR( 30 ) NOT NULL,
    last_name VARCHAR( 30 ) NOT NULL
);

CREATE INDEX idx_email_renter ON renter(email);

CREATE TABLE IF NOT EXISTS rental (
    rental_id serial PRIMARY KEY,
    van_id INT NOT NULL,
    email VARCHAR( 255 ),
    total_cost INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    FOREIGN KEY (van_id)
      REFERENCES van (van_id)
);

CREATE TABLE IF NOT EXISTS review (
    renter_id INT NOT NULL,
    van_id INT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    text TEXT NOT NULL,
    PRIMARY KEY (renter_id, van_id),
    FOREIGN KEY (renter_id)
      REFERENCES renter (renter_id),
    FOREIGN KEY (van_id)
      REFERENCES van (van_id)
);

INSERT INTO 
  owner (email, password, first_name, last_name) 
VALUES
  ('b@b.com', 'p123', 'Bob', 'Smith'),
  ('j@t.com', 'p456', 'Josh', 'Turner'),
  ('j@d.com', 'p789', 'Jane', 'Doe');

INSERT INTO 
  van (owner_id, name, price, description, image_url, type) 
VALUES
  (1, 'Modest Explorer', 60, 'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!', 'https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png','simple'),
  (1, 'Beach Bum', 80, 'Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won''t find in an ordinary camper', 'https://assets.scrimba.com/advanced-react/react-router/beach-bum.png', 'rugged'),
  (1, 'Green Wonder', 70, 'With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that''s perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.', 'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png', 'rugged'),
  (2, 'Reliable Red', 100, 'Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There''s a small kitchen, so you can cook if you need to. You''ll feel like home as soon as you step out of it.', 'https://assets.scrimba.com/advanced-react/react-router/reliable-red.png', 'luxury'),
  (3, 'Dreamfinder', 65, 'Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.', 'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png', 'simple'),
  (3, 'The Cruiser', 120, 'The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.', 'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png', 'luxury');

INSERT INTO
  renter (email, password, first_name, last_name)
VALUES 
  ('j@g.com', 'j123', 'Jonathan', 'Gates');

COMMIT;