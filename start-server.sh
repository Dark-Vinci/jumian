#!/bin/bash

# docker compose up postgres redis mongo

# set the node environment to be development
export NODE_ENV=development

# cd into sdk and compile the package
cd server/sdk
npx tsc
# await compilation
wait

# move back to the server folder
cd ../../server

# print working directory
pwd

# Loop through all subdirectories (assuming each subdirectory is a NestJS app)
for app_dir in */; do
  # Skip over any directories with names that should be excluded
  if [[ "$app_dir" == "mongodb/" || "$app_dir" == "redis/" || "$app_dir" == "postgres/" || "$app_dir" == "sdk/" ]]; then
    echo "Skipping $app_dir - excluded directory"
    continue
  fi

  # Run the app using the specified command
  (cd "$app_dir" && npm link sdk && npm run start:dev) &

done

# Wait for all apps to start up
wait
