const Comment = require('../models/comment.js');

function comments (app) {
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })
    app.delete('/reviews/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.log(err.message)
        })
    })
}

module.exports = comments;
