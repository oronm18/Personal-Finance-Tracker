# Base images
FROM python:3.9-slim AS build_python
FROM node:14 AS build_node

# ---- Python server ----
WORKDIR /app/budget_server

# Install server dependencies
COPY ./budget_server/src/requirements.txt ./
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
FROM python:3.9-slim

WORKDIR /app
COPY --from=build_python /app/budget_server /app/budget_server
COPY --from=build_node /app/budget_web/build /app/budget_web/build

# Start the server
CMD ["python", "/app/budget_server/src/main.py"]
