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

const defaultRoute = require('./routes/default.js');
const loginRoute = require('./routes/auth/login.js');
const tvshowRoute = require('./routes/tvshow/tvshow.js');
const seasonRoute = require('./routes/season/season.js');
const episodeRoute = require('./routes/episode/episode.js');

app.use('/api/', defaultRoute);
app.use('/api/login', loginRoute);
app.use('/api/tvshow', tvshowRoute);
app.use('/api/season', seasonRoute);
app.use('/api/episode', episodeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port} 😳 💩 😉 🐔 :-þ`);
});