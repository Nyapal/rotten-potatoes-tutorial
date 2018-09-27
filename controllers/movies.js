const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('68eb466ca897baf7a62975f97c5f32bc')
function movies(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', {movies: response.results})
        }).catch(console.console.error)
    })
}


// function movies (app) {
//     app.get('/', (req, res) => {
//         req.render('movies-index')
//         // Review.find()
//         //     .then(reviews => {
//         //         res.render('reviews-index', {reviews: reviews});
//         //     })
//         //     .catch(err => {
//         //         console.log(err);
//         //     });
//     //});
// })

module.exports = movies
