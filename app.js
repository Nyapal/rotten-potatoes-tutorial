const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews.js');
const comments = require('./controllers/comments.js');
const movies = require('./controllers/movies.js');
const app = express();
const Review = require('./models/review')
const Comment = require('./models/comment')
var exphbs = require('express-handlebars');

var mongoose = require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

reviews(app)
comments(app)
movies(app)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 5000!')
    const db = process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes';
    mongoose.connect(db);
})

module.exports = app;
