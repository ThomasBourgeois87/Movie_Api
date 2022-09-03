# Movie API

## Description
Development of a movie management API application. Made in node.js and hapipal. MySQL database.
Realized within the framework of the professional license web and big data applications developer

[Original Subject](https://dancole.gitbook.io/nodejs/)


## Installation

Install the dependencies and devDependencies and start the server.
```bash
npm install
```

Set environment variables
```bash
touch .env
```

```bash
DB_HOST = '0.0.0.0'
DB_PORT = '3306'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'movie_api'
```

## Run the application
```bash
npm start
```
Or install nodemon to update automatically the server (useful for development).
```bash
npm install -g nodemon
nodemon server
```

View API documentation
```bash
http://localhost:3000/documentation
```