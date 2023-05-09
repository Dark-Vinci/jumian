# Use an official Node.js runtime as a parent image
FROM node:14-alpine

ARG APP_NODE_ENV=development
ARG APP_PORT=5001

# Set the working directory to /app
WORKDIR /github.com/dark-vinci/node-fullstack/jumian/client/application

# Copy the package.json and package-lock.json files to the container
COPY application/package*.json /github.com/dark-vinci/node-fullstack/jumian/client/application

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY application /github.com/dark-vinci/node-fullstack/jumian/client/application

ENV NODE_ENV $APP_NODE_ENV

# Build the React app for production
RUN if [ $NODE_ENV = production ]; \
    then \
    npm run build; \
    fi

# Expose the port that the app will run on
EXPOSE $APP_PORT

# Start the app with the npm start command
CMD ["npm", "start"]
