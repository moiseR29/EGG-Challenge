CREATE SCHEMA IF NOT EXISTS business;

CREATE TABLE IF NOT EXISTS business.person(
	person_id SERIAL,
  	name TEXT NOT NULL,
  	lastname TEXT NOT NULL,
  	dni TEXT NOT NULL,
  	PRIMARY KEY("person_id")
);

CREATE TABLE IF NOT EXISTS business.account(
	account_id SERIAL,
  	username TEXT NOT NULL,
  	password TEXT NOT NULL,
  	person_id int4 NOT NULL,
  	PRIMARY KEY("account_id")
);

ALTER TABLE business.account ADD FOREIGN KEY ("person_id") REFERENCES business.person("person_id");

ALTER TABLE business.person ADD CONSTRAINT name_lastname_dni_unique UNIQUE(name, lastname,dni);

ALTER TABLE business.account ADD CONSTRAINT username_unique UNIQUE(username);

ALTER TABLE business.account ADD CONSTRAINT person_id_unique UNIQUE(person_id);
