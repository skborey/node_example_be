# Backend

Rest Api using `express framework` with `mongodb` as database to serve the follow purpose:
1. register, login, logout
2. searching restaurants excluding feature of time filter and pagination
3. fetching collection, add new collection, remove a collection, rename collection
4. add/remove restaurant/collaborator to collection
5. rename collaborator

# Project structure

```
+-- src
|   +-- api
|       +-- auth        -> folder containing authorization logic
|       +-- db          -> folder containing all manifest with dabase
|       +-- services    -> folder containing all processing and logic, except authorization logic
|       --- routes.js   -> specify route pointing to any service base on route purpose
|   +-- config          -> folder containing config for developement and production environment
|   --- server.js       -> initialize server
|---package-lock.json
|---package.json
```

# How to Start Server

## Prerequisite

1. Install [NodeJs](https://nodejs.org/en/) to the machine
2. Having `MonogDB` server, create a database (this database will use in configuration file)

## Setup

1. Get project source

   > clone source code from github repository using command `git clone https://github.com/skborey/isitopen_backend.git`
   
2. Install dependency libraries
   
   > go to root project root folder and run command `npm install` (all libraries is configured in package.json). Wait untill install is completed
   
3. Update config
  
   > go to two file in `config` folder to change `mongodb` configuration base on your desire server, and server port

4. Start server

  > go to `src` folder and run command
  
  - `node server.js` : by default will run server with configuratoin from `config/default.json` __or__
  - `nodemon server.js` : auto restart server whener something changed in source code __or__
  - `NODE_ENV=production node server.js` : run server with configuration from `config/production.json`

# Available API

| Method  | Endpoint  | Reqired Header  | Param  | Request Body |
|---|---|---|---|---|
| POST | api/v1/register  | - | -  | ```{'email': 'skborey@gmail.com', 'password': 'mypassword'``` |
| POST | api/v1/login  | -  | -  | ```{'email': 'skborey@gmail.com', 'password': 'mypassword'``` |
| GET | api/v1/logout  | `authorization`  | -  | - |
| GET | api/v1/restaurants  | `authorization`  | - | - |
| GET | api/v1/collections  | `authorization` | -  | - |
| PUT | api/v1/collections  | `authorization` | -  | ```{'name': 'Borey', 'owner_email':'skborey@gmail.com'}``` |
| POST | api/v1/collections/rename  | `authorization` | -  | ```{'id': '5df6614022eb0971498f3b6c', 'new_name': 'Borey Sok'}``` |
| POST | api/v1/collections/relation  | `authorization` | - | ```{ 'collection_id': '5df6614022eb0971498f3b6c', 'collaboration_id': '5df67bb3c85f853a78f2f90c', 'restaurant_id':'5df67bd7af54e63a834d25a9'}``` |
| DELETE | api/v1/collections/relation  | `authorization` | -  | ```{ 'collection_id': '5df6614022eb0971498f3b6c', 'collaboration_id': '5df67bb3c85f853a78f2f90c', 'restaurant_id':'5df67bd7af54e63a834d25a9'}```|
| DELETE | api/v1/collections/:id  | `authorization` | {id}  | - |
| PUT | api/v1/collaborations  | `authorization` | -  | -  |
| POST | api/v1/collaborations/rename  | `authorization` | -  | ```{'name': 'Borey', 'owner_email':'skborey@gmail.com'}```  |
