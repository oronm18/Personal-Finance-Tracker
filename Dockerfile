# Base images
FROM python:3.9-slim AS server_base
FROM node:14 AS web_base

# ---- Python server ----
WORKDIR /app/budget_server

# Install server dependencies
COPY ./budget_server/src/requirements.txt ./
RUN apt-get update && apt-get install -y python3-pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./budget_server/src/ /app/budget_server/src

# ---- Web application ----
WORKDIR /app/budget_web

# Install and build the web application
COPY ./budget_web/package*.json ./
RUN npm install
COPY ./budget_web/ ./
RUN npm run build

# ---- Final image ----
FROM server_base

# Copy built web application from web_base
COPY --from=web_base /app/budget_web/build /app/budget_web/build

# Start the server
CMD ["python", "/app/budget_server/src/main.py"]
