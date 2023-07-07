# Start a new stage for the web part
FROM node:14 as web-build

WORKDIR /web

COPY ./budget_web /web

# Install dependencies
RUN npm install

# Build the web application
RUN npm run build

# Start from a base image for server
FROM python:3.9-slim-buster as server-build

# Set working directory in the container
WORKDIR /app

# Copy the directory 'budget_server' into the container at /app
COPY ./budget_server /app

# Copy the built web app from the previous stage
COPY --from=web-build /web/build /app/budget_web/build

# Install dependencies
RUN pip install --no-cache-dir -r src/requirements.txt

# Set command to run your application using CMD command
ENTRYPOINT ["python", "./src/main.py", "/app/budget_web/build"]
