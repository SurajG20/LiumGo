const Vehicles = require('../models/Vehicles');
const Jobs = require('../models/Jobs');
const Blogs = require('../models/Blogs');
const { cloudinary } = require('../cloudinary');

module.exports.home = async (req, res) => {
  if (req.session.AdminUser) {
    var currentUser = req.session.AdminUser;
  }
  const blogs = await Blogs.find();

  res.render('index', { currentUser, blogs });
};
module.exports.about = (req, res) => {
  res.render('about');
};
module.exports.aboutDetails = (req, res) => {
  res.render('about-details');
};
module.exports.service = (req, res) => {
  res.render('service');
};
module.exports.electricFleet = async (req, res) => {
  const vehicles = await Vehicles.find();
  // console.log(vehicles[0])
  if (req.session.AdminUser) {
    var currentUser = req.session.AdminUser;
  }
  res.render('electric-fleet', { currentUser, vehicles });
};

module.exports.jobs = async (req, res) => {
  const jobs = await Jobs.find();
  if (req.session.AdminUser) {
    var currentUser = req.session.AdminUser;
  }
  res.render('jobs', { currentUser, jobs });
};
module.exports.blog = async (req, res) => {
  const blogs = await Blogs.find();
  if (req.session.AdminUser) {
    var currentUser = req.session.AdminUser;
  }
  const searchQuery = req.query['search-field'];

  if (!searchQuery) {
    return res.render('blog-standard', { currentUser, blogs });
  }
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.render('blog-standard', { currentUser, blogs: filteredBlogs });
};

module.exports.contact = (req, res) => {
  res.render('contact');
};

module.exports.addNewVehicle = (req, res) => {
  res.render('newVehicle');
};

module.exports.postNewVehicleForm = async (req, res) => {
  const vehicle = new Vehicles(req.body);
  vehicle.images = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });
  await vehicle.save();
  res.redirect('/electric-fleet');
};

module.exports.renderEditVehicleForm = async (req, res) => {
  const { id } = req.params;
  const vehicle = await Vehicles.findById(id);
  res.render('editVehicle', { vehicle });
};

module.exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  await Vehicles.findByIdAndDelete(id);
  res.redirect('/electric-fleet');
};

module.exports.postEditVehicleForm = async (req, res) => {
  const { id } = req.params;
  // const { name, description, image } = req.body
  const vehicle = await Vehicles.findByIdAndUpdate(id, req.body);
  console.log(req.files);
  const imgs = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });
  vehicle.images = [...imgs];
  // campground.save();
  vehicle.save();

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await vehicle.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  res.redirect('/electric-fleet');
};

module.exports.renderJobDetails = async (req, res) => {
  const { id } = req.params;
  const singleJob = await Jobs.findById(id);
  console.log(singleJob);
  res.render('job-details', { singleJob });
};

module.exports.renderBlogDetails = async (req, res) => {
  const { id } = req.params;
  const blogs = await Blogs.find();
  const singleBlog = await Blogs.findById(id);
  res.render('blog-details', { singleBlog, blogs });
};
module.exports.renderPrivacyPolicy = (req, res) => {
  res.render('privacy-policy');
};

module.exports.addNewJob = (req, res) => {
  res.render('newJob');
};

module.exports.postNewJobForm = async (req, res) => {
  const {
    title,
    description,
    location,
    responsibilities,
    requirements,
    jobType,
  } = req.body;
  const images = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });

  const job = new Jobs({
    title,
    description,
    location,
    responsibilities,
    requirements,
    jobType,
    images,
  });
  await job.save();
  res.redirect('/jobs');
};
module.exports.renderEditJobForm = async (req, res) => {
  const { id } = req.params;
  const job = await Jobs.findById(id);
  res.render('editJob', { job });
};

module.exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  await Jobs.findByIdAndDelete(id);
  res.redirect('/jobs');
};

module.exports.postEditJobForm = async (req, res) => {
  const { id } = req.params;
  const job = await Jobs.findByIdAndUpdate(id, req.body);
  const imgs = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });
  job.images = [...imgs];
  job.save();

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await job.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  res.redirect('/jobs');
};

module.exports.addNewBlog = (req, res) => {
  res.render('newBlog');
};

module.exports.postNewBlogForm = async (req, res) => {
  // data we are getting from the form
  const { name, description, image } = req.body;
  const blog = new Blogs(req.body);
  blog.images = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });
  await blog.save();
  res.redirect('/blogs');
};

module.exports.renderEditBlogForm = async (req, res) => {
  const { id } = req.params;
  const blog = await Blogs.findById(id);
  res.render('editBlog', { blog });
};

module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blogs.findByIdAndDelete(id);
  res.redirect('/blogs');
};

module.exports.postEditBlogForm = async (req, res) => {
  const { id } = req.params;
  const blog = await Blogs.findByIdAndUpdate(id, req.body);
  const imgs = req.files.map((f) => {
    return {
      url: f.path,
      filename: f.filename,
    };
  });
  blog.images = [...imgs];
  blog.save();

  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await blog.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  res.redirect('/blogs');
};
