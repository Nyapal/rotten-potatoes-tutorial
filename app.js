const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews.js');
const app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

reviews(app)

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
