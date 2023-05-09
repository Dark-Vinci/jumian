FROM node:16-bullseye-slim

# build args
ARG APP_PORT=3005
ARG APP_NODE_ENV=development
ARG APP_TOKEN=12
ARG APP_PROJECT_NAME=shops

#set the work dir
WORKDIR /github.com/dark-vinci/node-fullstack/jumian/shops

COPY  sdk /github.com/dark-vinci/node-fullstack/jumian/sdk

# cd to {sdk}, transpile and move back to {shop}
RUN cd /github.com/dark-vinci/node-fullstack/jumian/sdk \
    && npm install \
    && npx tsc  \
    && npm link \
    && cd /github.com/dark-vinci/node-fullstack/jumian/shops

#install needed packages
COPY shops/package*.json /github.com/dark-vinci/node-fullstack/jumian/shops
RUN npm install

#link with {sdk}
RUN npm link sdk

#copy the application
COPY shops /github.com/dark-vinci/node-fullstack/jumian/shops

#set the environment variables
ENV PORT $APP_PORT
ENV NODE_ENV $APP_NODE_ENV
ENV APP_TOKEN $APP_TOKEN

EXPOSE $PORT

RUN echo "application $APP_PROJECT_NAME is about to run on port $PORT"

#runs the container
CMD if [ $NODE_ENV = production ]; \
    then \
    npm run start:prod; \
    else \
    npm run start:dev; \
    fi
