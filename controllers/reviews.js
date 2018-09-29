const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

function reviews (app) {
    app.get(`/movies/:movieId/reviews/new`, (req, res) => {
        res.render('reviews-new', {movieId: req.params.movieId});
    })
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            Comment.find({reviewId: req.params.id}).then(comments => {
                res.render('reviews-show', {review: review, comments: comments})
            })
        }).catch((err) => {
          console.log(err.message);
        })
    });
    app.get('/reviews/:id/edit', function (req, res) {
      Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
      })
    })
    app.post('/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
          console.log(review);
          res.redirect(`/reviews/${review._id}`)
      }).catch((err) => {
          console.log(err.message)
      })
    })
    app.post('/movies/:movieId/reviews', (req, res) => {
        console.log(req.body)
    })
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })
    app.delete('/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
    })
}

module.exports = reviews
