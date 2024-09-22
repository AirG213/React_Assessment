# Use a Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository from GitHub
RUN git clone https://github.com/AirG213/React_Assessment.git .

# Install the required libraries
RUN npm install
RUN npm install react-router-dom react-transition-group node-sass

# Build the project
RUN npm run build

# Install serve to serve the build files
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["serve", "-s", "build", "-l", "8080"]
