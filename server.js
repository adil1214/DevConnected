const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// DB config
const db = require('./config/keys').MONGODB_URI;

// Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to database.'))
  .catch(e => console.log(e));


app.get('/', (req, res) => {
  res.send('Hello');
});

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = 5000;

app.listen(port, () => {
  console.log(`server started at port ${port}`);
})