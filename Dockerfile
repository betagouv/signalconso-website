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

# Install dependencies
RUN yarn

# copy the source code and stuff required to build the site
COPY src src
COPY public public
COPY next-env.d.ts ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

ENV NEXT_PUBLIC_SHOW_DEMO_CATEGORY true
ENV NEXT_PUBLIC_ENV_MARKER "depuis Docker"

RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]




# USEFUL COMMANDS


# Build an image from Dockerfile and name it "tmp"
#
# docker build -t tmp .
#
# This will log a hash that may be used in the commands below

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


