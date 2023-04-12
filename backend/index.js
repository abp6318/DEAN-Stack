require('dotenv').config();
const cors = require('cors');
const express = require('express');
let bodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const app = express();
const port =  process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(cors({origin: '*'}));

// used for making other routes secure
const auth = require('./routes/auth/auth.js');

const defaultRoute = require('./routes/default.js');
const loginRoute = require('./routes/auth/login.js');
const tvshowRoute = require('./routes/tvshow/tvshow.js');
const tvshowsRoute = require('./routes/tvshows/tvshows.js');
const seasonRoute = require('./routes/season/season.js');
const episodeRoute = require('./routes/episode/episode.js');

app.use('/', defaultRoute);
app.use('/login', loginRoute);
app.use('/tvshow', tvshowRoute);
app.use('/tvshows', tvshowsRoute);
// app.use('/season', seasonRoute);
// app.use('/episode', episodeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port} 😳 💩 😉 🐔 :-þ`);
});