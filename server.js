const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// if mongo require a password
// const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/authRoutes')(app);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/folio")
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB', err));

const { User } = require('./models/user');
const { Portfolio } = require('./models/portfolio');
const { Review } = require('./models/reviews');
const { auth } = require('./middleware/auth');

// GET routes //
app.get('/api/auth', auth, (req, res) => {
  console.log(req.user);
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
});

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

app.get('/api/users', (req, res) => {
  User.find().then((doc, err) => res.send(doc))
  .catch(err => res.json({ err: err }));
});

app.get('/api/getPortfolio/:id', (req, res) => {
  Portfolio.findById(req.params.id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.get('/api/portfolios', (req, res) => {
  // locahost:3001/api/portfolios?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Portfolio.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .then((doc, err) => res.send(doc))
    .catch(err => res.json({ err: err }));
});

app.get('/api/portfolios/reviewed', (req, res) => {
  Portfolio.find({ reviewed: true })
    .then((doc, err) => res.send(doc))
    .catch(err => res.json({ err: err }));
});

app.get('/api/portfolio/notes/:id', function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  console.log(req.params.id);
  Portfolio.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate('review')
    .then(function(dbPortfolio) {
      // If we were able to successfully find an Portfolio with the given id, send it back to the client
      res.json(dbPortfolio);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// POST routes //
app.post('/api/portfolio', (req, res) => {
  const portfolio = new Portfolio(req.body);

  portfolio.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      portfolioId: doc._id
    });
  });
});

app.post('/api/review/:id', function(req, res) {
  // Create a new review and pass the req.body to the entry
  console.log('review', req.body);
  Review.create(req.body)
    .then(function(dbReview) {
      return Portfolio.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { review: dbReview._id }, $set: { reviewed: true } },
        { new: true }
      );
    })
    .then(function(dbReview) {
      res.json(dbReview);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err: err });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
});

app.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: 'Auth failed, email not found'
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: 'Wrong password'
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        });
      });
    });
  });
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});
