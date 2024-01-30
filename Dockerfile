FROM node:20.9.0-alpine

# Create an "/myapp" subfolder and cd into it
WORKDIR /myapp

# copy yarn stuff required to install the dependencies
## (cf https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/cache .yarn/cache
COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases
# COPY .yarn/patches .yarn/patches
# COPY .yarn/versions .yarn/versions

# At this point, if I run "yarn --version", I have the correct version (3.2.1)

# Install Yarn dependencies
RUN yarn

# Copy the source code and stuff that may be required to build the site
# (I don't copy everything because I want to avoid other stuff like node_modules, .next, etc.)
COPY src src
COPY public public
COPY next-env.d.ts ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY .eslintrc.json ./

# Setup env variables
ENV NEXT_PUBLIC_SHOW_DEMO_CATEGORY true
ENV NEXT_PUBLIC_ENV_MARKER "en local depuis Docker, branché sur l'API de démo"
ENV NEXT_PUBLIC_API_BASE_URL https://demo-signalement-api.cleverapps.io
ENV NEXT_PUBLIC_APP_BASE_URL http://localhost:3000

EXPOSE 3001
# Start in dev mod (so with hot reload)
CMD ["yarn", "dev"]

# =========
# Useful commands to help debug a Dockerfile ;
# =========
#
# Build an image from Dockerfile and name it "tmp"
# (This will log a hash of the image that may be used in the commands below)
# docker build -t tmp .
#
# Start a simple container based on a node image, keep it open with an interactive shell
# so you can type some commands to explore the available files and programs
# (the container will be dropped after)
# docker run --rm -it node:20.9.0-alpine sh

# Start a container based on any image hash, keep it open with an interactive shell
# (this way you can explore an image you built from a Dockerfile)
# docker run --rm -it YOUR_HASH_HERE sh
#
# Start a container, also opening a port and keeping the default command
# docker run -p 3000:3000 --rm -it YOUR_HASH_HERE
#
# For the docker-compose.yml
# This runs the docker-compose.yml, forcing to rebuild the image from the Dockerfile
# docker-compose up --build