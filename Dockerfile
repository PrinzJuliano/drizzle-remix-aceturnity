# base node image
FROM node:20-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# upgrade everything
RUN apt-get update && apt-get upgrade -yqq && apt-get install curl -yqq

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/drizzle /myapp/drizzle
COPY --from=build /myapp/package.json /myapp/package.json

ENTRYPOINT [ "npm", "run", "start" ]
HEALTHCHECK CMD curl --fail http://localhost:${PORT}/ || exit 1
