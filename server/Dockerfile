FROM node:18.3.0-alpine3.14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --f

# Copy the rest of the backend files to the container
COPY . .

# Expose the port your backend server listens on
EXPOSE 3001

# Set the startup command to run your backend server
CMD ["npm", "start"]