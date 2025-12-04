###############################################
# 1) Build Stage — Create Production Build
###############################################
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Vite app
RUN npm run build


###############################################
# 2) Serve Stage — Use Nginx to host the build
###############################################
FROM nginx:stable

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build outputs to nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port for Render / Docker
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
