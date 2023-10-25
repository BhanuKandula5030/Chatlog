# Chat Transcripts API #

# Introduction #:

This project aims to create a RESTful API for storing and managing chat transcripts of the conversations between the alice and bob

# Assumptions #

# SQLite Database: #

We assume that an SQLite database is set up and accessible. The database is used to store chat transcripts. The database file is named as chat.db.
# Database Initialization: #

It is assumed that the SQLite database has been initialized with the required table. The chat_transcripts table has sender,reciever and message 
# HATEOAS Principles:

We follow HATEOAS  principles by providing links in response data. These links include 'POST', 'get,' 'update,' 'delete,' and 'all-conversations'
# RESTful API:

The API endpoints and methods adhere to RESTful principles. It includes POST for creating, GET for retrieving, PUT for updating, and DELETE for deleting chat transcripts.

# Testing:

This code assumes testing will be performed to verify the functionality of the API.
# Port Number:

The API is set to run on port 4000 by default. You may change the port in the code if needed.

## Docker and Docker Compose:
For the running the API using Docker and Docker Compose.The provided `Dockerfile` and `docker-compose.yml` files.
Build Command :

Docker-compose Command :
docker build -t chat-log-service .

docker-compose up --build

# Getting Started
To use this API, ensure that you have an SQLite database set up and running. You can start the API by running the provided JavaScript file using Node.js:

# Run Command :
node server.js 

# URL :

https://localhost:4000/conversations

# API Endpoints:

POST /conversations: Create a new chat conversation.
GET /conversations/:id: Retrieve a specific conversation by ID.
GET /conversations: Retrieve all chat conversations.
PUT /conversations/:id: Update a specific conversation by ID.
DELETE /conversations/:id: Delete a specific conversation by ID.

# Conclusion:

This README provides an overview of the assumptions made during the development of the Chat Transcripts API.
