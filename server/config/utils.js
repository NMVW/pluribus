var User = require('../db/dbconfig').User;

module.exports = {
  //this util simply checks if the user is authenticated or not
  checkAuthentication: function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  },

  getClientSelf: function (req, res){
    var userId = req.session.user;
    User.findById(userId)
    .then(function (user) {
      res.status(200).json(user);
    })
    .catch(function (err) {
      console.error (err);
    });
  }
};
