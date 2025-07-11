# Use official Node LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of your code
COPY . .

# Expose server port
EXPOSE 5001

# Start the app
RUN npm install -g nodemon
CMD ["nodemon", "app.js"]
