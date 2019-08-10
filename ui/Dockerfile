# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ui/package.json /app/package.json
RUN yarn

EXPOSE 3000
EXPOSE 9009
CMD ["yarn", "start"]