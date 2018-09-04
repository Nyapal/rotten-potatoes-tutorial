const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = mongoose.model('Review', {
  title: String
});

var exphbs = require('express-handlebars');
// let reviews = [
//     {title: 'Submarine'},
//     {title: 'American History X'},
//     {title: 'The Pianist'},
//     {title: 'Black Panther'},
//     {title: 'The Reader'}
// ]
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//     res.render('home', {msg: 'Hello World!'})
// })
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {console.log(err);
        })
    })
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
