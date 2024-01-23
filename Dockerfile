# # Step 1: Use the official Node.js base image with your specific version
# FROM node:20.9.0

# # Step 2: Set the working directory
# WORKDIR /app

# # Step 3: Copy package files
# COPY package.json yarn.lock ./

# # Step 4: If Yarn is not included in your base image, install it
# # RUN npm install -g yarn@YOUR_YARN_VERSION

# # Step 5: Install dependencies
# RUN yarn install

# # Step 6: Copy the rest of your source files
# COPY . .

# # Step 7: Build the project (if necessary)
# # RUN yarn build

# # Step 8: Define the command to run your app
# CMD ["yarn", "start"]



# # Use an official Node runtime as a parent image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install any needed packages
# RUN npm install

# # Bundle app source inside the Docker image
# COPY . .

# # Make port 3000 available to the world outside this container
# EXPOSE 3000

# # Define the command to run your app
# CMD [ "node", "app.js" ]


# # Start your image with a node base image
# FROM node:18-alpine

# # The /app directory should act as the main application directory
# WORKDIR /app

# # Copy the app package and package-lock.json file
# COPY package*.json ./

# # Copy local directories to the current local directory of our docker image (/app)
# COPY ./src ./src
# COPY ./public ./public

# # Install node packages, install serve, build the app, and remove dependencies at the end
# RUN npm install \
#     && npm install -g serve \
#     && npm run build \
#     && rm -fr node_modules

# EXPOSE 3000

# # Start the app using serve command
# CMD [ "serve", "-s", "build" ]



FROM node:20.9.0-alpine

# Create an "/myapp" subfolder and cd into it
WORKDIR /myapp

# copy yarn stuff required to install the dependencies
## (cf https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases
# COPY .yarn/patches .yarn/patches
# COPY .yarn/versions .yarn/versions

# At this point, if I run "yarn --version", I have the correct version (3.2.1)

# Install dependencies
RUN yarn

# copy all
COPY . .

ENV NEXT_PUBLIC_SHOW_DEMO_CATEGORY true
ENV NEXT_PUBLIC_ENV_MARKER "depuis Docker"

CMD ["yarn", "devdemo"]




# USEFUL COMMANDS

# Start a simple container based on a simple node image, keep it open with an interactive shell
# (it will be dropped after)
#
# docker run --rm -it node:20.9.0-alpine sh

# Start a container based on any image hash, keep it open with an interactive shell
#
# docker run --rm -it YOUR_HASH_HERE sh

# Opening a port and keeping the default command (so no "sh" at the end)
# 
# docker run -p 3001:3001 --rm -it YOUR_HASH_HERE

# Build an image from Dockerfile and name it "tmp"
#
# docker build -t tmp .
