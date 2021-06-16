# EGG-Challenge

## Problem

1. login/signup de usuarios con bcrypt y jwt, esos usuarios pueden modificar sus datos (nombre, apellido y dni), y además pueden cargar N hijos, esos hijos se pueden loguear y solo ver sus propios datos y los padres pueden modificar los datos de sus propios hijos (nombre, apellido y dni).

2. Endpoint que traiga un listado con todos los hijos, con un limite de 10.

# API

> ***IN ALL REQUEST SEND x-access-token***
> * Requerid

## ACCOUNT

### CREATE

- post -> host:port/api/account
- body 
	```json
	{
		"name": "name", 				*
		"lastname": "lastname",			*
		"dni": "dni",					*
		"username": "username",			*
		"password": "password"			*
	}
	```

### CREATE REFFER

- post -> host:port/api/referencesaccount
- header -> x-egg-token											*
- body 
	```json
	{
		"name": "name", 										*
		"lastname": "lastname",									*
		"dni": "dni",											*
		"username": "username",									*
		"password": "password"									*
	}
	```

### LOGIN

- post -> host:port/api/referencesaccount
- body 
	```json
	{
		"username": "username",									*
		"password": "password"									*
	}
	```

### UPDATE PERSON

- put -> host:port/api/person
- header -> x-egg-token											*
- body 
	```json
	{
		"personId": "username", 								*
		...personToChanged
	}
	```

### GET REFFERECES

- get -> host:port/api/referenceaccount
- header -> x-egg-token											*
