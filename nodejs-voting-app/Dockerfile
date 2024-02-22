# Use the official Node.js image.
FROM node:14

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Make the port available to the world outside this container.
EXPOSE 8080

# Define the command to run the app.
CMD [ "node", "index.js" ]
