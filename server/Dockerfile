FROM node:12.16.2-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN yarn install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 1000
CMD ["yarn", "dev"]