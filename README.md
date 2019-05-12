# React Movie Search

## Requirements
* npm 6.9.0
* An API key from TheMovieDb


## Installation

```
cd server/
npm install

cd client/
npm install
```

## Starting the Application
First you'll want to boot up the backend server:
```
cd server/
TMDB_KEY={Your API Key Here} npm start
```

Alternately, you can make a `.env` file in the `server/` directory and add your `TMDB_KEY` there. If you use `.env`, you can start the server by invoking `npm start`.

If the server boots up successfully, you should see that it is listening on port 3002

Next, start the client UI:
```
cd client/
npm start
```

This should automatically open a browser and point you at `localhost:3000`. 


