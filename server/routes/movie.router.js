const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Router to get ALL movies from the database in alphabetical order by title
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// Get a specific movie by ID from the db
router.get('/:id', (req, res) => {
  const movieID = req.params.id;

  const query = `
  SELECT "movies"."id", "movies"."title", "movies"."poster", "movies"."description", "movies_genres"."genre_id", "genres"."name"
	FROM "movies" 
	JOIN "movies_genres"
	ON "movies"."id" = "movies_genres"."movie_id"
	JOIN "genres"
	ON "genres"."id" = "movies_genres"."genre_id"
	WHERE "movies"."id" = $1;
  `;

  const sqlValues = [movieID];

  pool.query(query, sqlValues)
    .then(result => {
      // Grab the first row of results. We have to format
      //  the data from our joined table a bit
      const firstResult = result.rows[0];
      const results = result.rows;
      
      // Condensing rows into one result with an array for genres
      let movieResult = {
        id: firstResult.id,
        title: firstResult.title,
        poster: firstResult.poster,
        description: firstResult.description,
        genres: []
      }

      // Map through and add all genres to the movieResult object
      results.map((x) => {
        movieResult.genres.push({id: x.genre_id, name: x.name});
      })

      console.log("Sending movie result:", movieResult);
      res.send(movieResult);
    })
    .catch(err => {
      console.log("Error in GET movie by ID:", err);
      res.sendStatus(500);
    })
})

// FOR STRETCH
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;