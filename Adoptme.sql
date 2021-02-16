DROP DATABASE IF EXISTS adoptmedb;
CREATE DATABASE adoptmedb;

CREATE TABLE "pets" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "uf" text,
  "city" text,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

INSERT INTO categories(name) VALUES ('Cachorro');
INSERT INTO categories(name) VALUES ('Gato');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "pet_id" int
);

ALTER TABLE "pets" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("pet_id") REFERENCES "pets" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

-- foreign key
ALTER TABLE "pets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- Create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto updated_at pets
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON pets
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();