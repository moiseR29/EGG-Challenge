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

CREATE TABLE IF NOT EXISTS business.reference_account(
  reference_account_id SERIAL,
  account_id int4 NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  person_id int4 NOT NULL,
  active BOOLEAN DEFAULT true,
  PRIMARY KEY("reference_account_id")
);

ALTER TABLE business.reference_account ADD FOREIGN KEY ("account_id") REFERENCES business.account("account_id");
ALTER TABLE business.reference_account ADD FOREIGN KEY ("person_id") REFERENCES business.person("person_id");
