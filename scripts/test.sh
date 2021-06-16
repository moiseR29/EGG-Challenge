#!/bin/sh

echo "EGG TESTING"

if [ ! -x "$(command -v docker)" ]; then
  echo "No tenes instalado docker"
  exit 1
fi

if [ ! -d ./node_modules ]; then
  echo "Please Install dependecies (npm i)"
  exit 1
fi

if [ "$(docker ps -a | grep egg-test)" ]; then
  echo "DELETE DATABASE"
  docker stop egg-test && docker rm egg-test
fi

echo "INIT DATABASE TEST"
docker run --name egg-test -p 5433:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=egg -e POSTGRES_DB=test -d postgres

sleep 10

echo "MIGRATIONS"
node ./node_modules/.bin/db-migrate up --config ./scripts/util/database.json -e test

echo "EXEC TEST"
node ./node_modules/.bin/jest

echo "DELETE DATABASE"
docker stop egg-test && docker rm egg-test 

