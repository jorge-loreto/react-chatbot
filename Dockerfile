# Step 1: Build the React app
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app
# Accept build-time environment argument
ARG REACT_ENV=development
# Set environment variable
ENV REACT_ENV=$REACT_ENV
# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

COPY .env.${REACT_ENV} .env.production
# Build the app for production
# Optional: log which env was used
RUN echo "Using environment: ${REACT_ENV}" && cat .env.production
# Build the React app
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
