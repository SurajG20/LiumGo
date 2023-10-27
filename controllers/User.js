const User = require('../models/User');

module.exports.getLoginForm = (req, res) => {
  if (!req.session.AdminUser) {
    req.session.destroy();
    return res.render('login');
  }
  return res.redirect(`/`);
};
module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
};

module.exports.postLoginForm = async (req, res) => {
  if (req.session.AdminUser) {
    return res.redirect(`/home`);
  }
  const { username, password } = req.body;
  try {
    const adminUser = await User.findOne({ username });
    if (adminUser) {
      if (adminUser.password === password) {
        // console.log(adminUser)
        req.session.AdminUser = adminUser;
        return res.redirect('/');
      }
    }
    // else {
    res.redirect('/admin');
    // }
  } catch (e) {
    throw e;
  }
};
