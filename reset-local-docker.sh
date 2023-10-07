#!/bin/bash

# Fetch container ID
container_id=$(docker ps -aq --filter ancestor=postgres:14.1-alpine)

# Fetch image ID
image_id=$(docker images -q postgres:14.1-alpine)

# Define volume name
volume_name="web_db"

# Stop the container if it's running or stopped
if [[ ! -z "$container_id" ]]; then
  docker container stop $container_id
  docker container rm -f $container_id
fi

# Remove the image if it exists
if [[ ! -z "$image_id" ]]; then
  docker image rm -f $image_id
fi

# Remove the volume if it exists
if [[ $(docker volume ls -q -f name=$volume_name) ]]; then
  docker volume rm $volume_name
fi

# Start the container with Docker Compose
docker-compose -D up

