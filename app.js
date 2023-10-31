require("dotenv").config();
const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
const ElectricFleetRoutes = require("./routes/ElectricFleet");
const JobsRoutes = require("./routes/JobsRoutes");
const BlogsRoutes = require("./routes/BlogsRoutes");
const AboutRoutes = require("./routes/AboutRoutes");
const DetailRoutes = require("./routes/DetailRoutes");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
// const dbUrl =
  // "mongodb+srv://surajgoswami3000:gMZEHb25CXHzINxj@liumgo.t7exneu.mongodb.net/?retryWrites=true&w=majority"; //FOR DEVELOPMENT MODE
const dbUrl = process.env.DBURL;//FOR Production MODE
const connectDb = require("./db/connect");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const secret = process.env.SECRET;
// const secret = "liumgo";

app.use(
  session({
    secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      dbName: "liumgo",
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native",
    }),
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.AdminUser;
  next();
});

app.use("/", UserRoutes);
app.use("/admin/", AdminRoutes);
app.use("/electric-fleet", ElectricFleetRoutes);
app.use("/jobs", JobsRoutes);
app.use("/blogs", BlogsRoutes);
app.use("/about", AboutRoutes);
app.use("/contact", DetailRoutes);

app.use("*", (req, res) => {
  res.render("error");
});

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDb(dbUrl);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
