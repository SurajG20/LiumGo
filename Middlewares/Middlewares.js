// const { ExpressError } = require('../utils/ExpressError')

module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.AdminUser) {
        return next()
    }
    throw new Error("Page Not Found");
}