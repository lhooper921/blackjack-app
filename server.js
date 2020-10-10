const express = require('express');
const session = require("express-session");
const expressHandlebars = require('express-handlebars');
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;
var db = require("./models");

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Custom Handlebars Helper function

// a limited 'each' loop.
// usage: {{#limit items offset="1" limit="5"}} : items 1 thru 6
// usage: {{#limit items limit="10"}} : items 0 thru 9
// usage: {{#limit items offset="3"}} : items 3 thru context.length
// defaults are offset=0, limit=5
Handlebars.registerHelper('limit', function(context, block) {
  var ret = "",
      offset = parseInt(block.hash.offset) || 0,
      limit = parseInt(block.hash.limit) || 5,
      i = (offset < context.length) ? offset : 0,
      j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

  for(i,j; i<j; i++) {
    ret += block(context[i]);
  }

  return ret;
});


app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/view-routes')(app);
require('./controllers/api-routes')(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });
  