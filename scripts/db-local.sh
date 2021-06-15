#!/bin/sh

if [ ! -x "$(command -v docker)" ]; then
  echo "No tenes instalado docker"
  exit 1
fi

docker run --name egg-database -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=egg -e POSTGRES_DB=challenge -d postgres
