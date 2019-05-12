# React Movie Search

## Requirements
* Node with npm  (Node 12.1.0 was used for development)
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

The application is designed to be single page. You can click on any card to see a detailed view of the movie. Clicking on 'Go Back' should return you to your application's state.

Searching for films is achieved with the search bar at the top. The 20 currently Most Popular movies are available by using the top nav bar, as well as a list of movies in theatres.
