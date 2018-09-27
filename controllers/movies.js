const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('68eb466ca897baf7a62975f97c5f32bc')
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

function movies (app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
        //moviedb.mi({ query: 'The Lion King' }).then(response => {
            console.log({movies: response.results})
            res.render('movies-index', {movies: response.results})
        }).catch(console.error)
    })
}



// app.get('/', (req, res) => {
//     moviedb.searchMovie({query: 'Alien'}).then(response => {
//         res.render('movies-index', {movies: response.results})
//     }).catch(err => {
//         console.log(err)
//     })
// })

module.exports = movies
