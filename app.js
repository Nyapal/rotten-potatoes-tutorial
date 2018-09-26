const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews.js');
const app = express();

var exphbs = require('express-handlebars');

var mongoose = require('mongoose');



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

reviews(app)

// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
    const db = process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes';
    mongoose.connect(db);
})

module.exports = app;
