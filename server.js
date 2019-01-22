require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = process.env.MONGODB_URI;

// Connect to mongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to database.'))
	.catch((err) => console.log(err));

mongoose.set('useCreateIndex', true);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Rate limiter
app.enable('trust proxy');

let limiter = new RateLimit({
	store: new MongoStore({
		uri: db
	}),
	max: 450,
	windowMs: 15 * 60 * 1000
});		// 450 requests every 15mins 

// TODO: handle 429 error on the frontend
app.use(limiter);

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}

app.listen(port, () => {
	console.log(`server started at port ${port}`);
});
