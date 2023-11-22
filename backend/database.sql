CREATE TABLE IF NOT EXISTS owner (
    owner_id serial PRIMARY KEY,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL,
    first_name VARCHAR( 30 ) NOT NULL,
    last_name VARCHAR( 30 ) NOT NULL
);

CREATE TYPE van_types AS ENUM ('simple', 'rugged', 'luxury');

CREATE TABLE IF NOT EXISTS van (
    van_id serial PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR( 30 ) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR( 255 ) NOT NULL,
    type van_types NOT NULL
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

CREATE TABLE IF NOT EXISTS rental (
    rental_id serial PRIMARY KEY,
    van_id INT NOT NULL,
    renter_id INT NOT NULL,
    FOREIGN KEY (van_id)
      REFERENCES van (van_id)
    FOREIGN KEY (renter_id)
      REFERENCES renter (renter_id)
);

CREATE TYPE rating_stars AS ENUM (1, 2, 3, 4, 5);

CREATE TABLE IF NOT EXISTS review (
    renter_id INT NOT NULL,
    van_id INT NOT NULL,
    rating rating_stars NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW()
    text VARCHAR( 255 ) NOT NULL
    PRIMARY KEY (renter_id, van_id),
    FOREIGN KEY (renter_id)
      REFERENCES renter (renter_id)
    FOREIGN KEY (van_id)
      REFERENCES van (van_id)
);

INSERT INTO owner (email, password, first_name, last_name)
VALUES
('b@b.com', 'p123', 'Bob', 'Smith')

INSERT INTO van (owner_id, name, price, description, type)
VALUES
(1, 'Modest Explorer', 60, 'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!', 'simple')
(1, 'Beach Bum', 80, 'Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won''t find in an ordinary camper', 'rugged')
(1, 'Green Wonder', 70, 'With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that''s perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.', 'rugged')

-- server.create("van", { id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" })
-- server.create("van", { id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" })
-- server.create("van", { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" })
-- server.create("van", { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" })
-- server.create("van", { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" })
-- server.create("van", { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" })