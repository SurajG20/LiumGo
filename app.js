require('dotenv').config();
const express = require('express');
const app = express();
const User = require('./models/User');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const ElectricFleetRoutes = require('./routes/ElectricFleet');
const JobsRoutes = require('./routes/JobsRoutes');
const BlogsRoutes = require('./routes/BlogsRoutes');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const dbUrl = 'mongodb://127.0.0.1:27017/liumgo'; //FOR DEVELOPMENT MODE
// const dbUrl = process.env.DBURL; //FOR Production MODE

mongoose.connect(dbUrl).then(() => {
  console.log('Database Connected !!');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const secret = process.env.SECRET;
app.use(
  session({
    secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      dbName: 'liumgo',
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
    }),
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.AdminUser;
  next();
});

app.use('/', UserRoutes);
app.use('/admin/', AdminRoutes);
app.use('/electric-fleet', ElectricFleetRoutes);
app.use('/jobs', JobsRoutes);
app.use('/blogs', BlogsRoutes);

// app.all("*", (req, res, next) => {
//     next(new ExpressError("Page Not Found!", 404));
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('SERVER STARTED On PORT 8000');
});
