var User = require('../db/dbconfig').User;

module.exports = {
  getAllUsers: function (req, res) {
    User.findAll({})
    .then(function (users) {
      //res.send(users);
      res.status(200).json(users);
    })
    .catch(function (err) {
      console.error (err);
    });
  },

  getUser: function (req, res) {
    var userId = req.params.googid;
    User.findById(userId)
    .then(function (user) {
      res.status(200).json(user);
    })
    .catch(function (err) {
      console.error (err);
    });
  },

  findOrCreateUser: function (body, next) {
    var userData = {
      googid: body.id,
      firstName: body.given_name,
      lastName: body.family_name,
      email: body.email,
      picture: body.picture
    };
    User.findOrCreate({where: userData})
    .then(function (user) {
      //send data back to /callback route
      next(user);
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  //this will add a relationship to the UserFriends table
  addFriend: function (req, res) {
    var googId = req.session.user;
    var friendId = req.body.friendGoogId;
    User.find({where: {googid: googId}})
    .then(function (user) {
      user.addFriends(friendId);
      res.status(201).json(user);
    })
    .catch(function (err) {
      console.error(err);
    });
  },
  
  getFriends: function (req, res) {
    var googId = req.session.user;
    User.find({where: {googid: googId}})
    .then(function(user){
      user.getFriends()
      .then(function(friends){
      res.status(200).json(users);  
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  }
};
