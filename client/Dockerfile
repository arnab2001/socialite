# Use a base image with Nginx pre-installed
FROM nginx:alpine

# Copy the built frontend files to the appropriate location in the container
COPY build/ /usr/share/nginx/html

# Expose the port your frontend application listens on
EXPOSE 80

# Set the startup command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
