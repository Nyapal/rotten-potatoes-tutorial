const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('68eb466ca897baf7a62975f97c5f32bc')
const Review = require('../models/review.js');

function movies (app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results})
        }).catch(console.error)
    })
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({id: req.params.id}).then(response => {
            Review.find({ movieId: req.params.id}).then(reviews => {
                res.render('movies-show', {response: response, reviews: reviews})
            })
        }).catch(console.error)
    })
}
module.exports = movies;
