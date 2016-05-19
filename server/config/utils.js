module.exports = {
  //this util simply checks if the user is authenticated or not
  checkAuthentication: function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
};