var Plurb = require('../db/dbconfig').Plurb;
var User = require('../db/dbconfig').User;


module.exports = {
  //currently not being used
  getAllPlurbs: function (req, res) {
    Plurb.findAll({})
    .then(function (plurbs) {
      res.status(200).json(plurbs);
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  createPlurb: function (req, res) {
    var googId = req.session.user;
    var topicId = req.body.topicId;
    //make a db call using the googid and returns user data
    User.find({where: 
      {googid: googId}
    })
    .then(function (user) {
      //set the values for first and last names, picture
      //put all data into an objected used to create plurb
      var plurbData = {
        text: req.body.text,
        lat: req.body.lat,
        long: req.body.long,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        picture: user.dataValues.picture
      };
      Plurb.create(plurbData)
      .then(function (plurb) {
        //sets the foreign key of googId and topicId
        plurb.setUser(googId);
        plurb.setTopic(topicId);
        res.status(201).json(plurb);
      })
      .catch(function (err) {
        console.error(err);
      });
    });
  },

  getPlurb: function (req, res) {
    var plurbId = req.params.plurbId;
    Plurb.findById(plurbId)
    .then(function (plurb) {
      res.status(200).json(plurb);
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  deletePlurb: function (req, res) {
    var plurbId = req.params.plurbId;
    Plurb.destroy({where: {id: plurbId}})
    .then(function () {
      res.status(201);
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  getPlurbsByGoogId: function (req, res) {
    var googId = req.params.googId;
    Plurb.findAll({where: {UserGoogid: googId}})
    .then(function (plurbs) {
      res.status(200).json(plurbs);
    })
    .catch(function (err) {
      console.error(err);
    });
  }, 

  getPlurbsByLocation: function (req, res) {
    var topicId = req.body.topicId;
    var minLat = req.body.mapBounds.minLat;
    var maxLat = req.body.mapBounds.maxLat;
    var minLng = req.body.mapBounds.minLng;
    var maxLng = req.body.mapBounds.maxLng;
    //if topic id is 0 send back all plurbs in that location regardless of topic
    if (topicId === 0) {
      //find all plurbs that fit within the min-max range
      Plurb.findAll({
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]}
        }
      })
      .then(function (plurbs) {
        res.status(200).json(plurbs);
      })
      .catch(function (err) {
        console.error (err);
      });
      //otherwise send back plurbs with that topic and location
    } else {
      Plurb.findAll({
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]},
          TopicId: topicId
        }
      })
      .then(function (plurbs) {
        res.status(200).json(plurbs);
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  },

  getAllFriendsAllPlurbs: function (req, res) {
    var googId = req.body.user;
    // var googId = req.session.user;
    var friendsGoogIds = [];
//Create array of all friends googIds

    User.find({where: {googid: googId}})
    .then(function(user) {
      //this built in Sequelize method will pull all friends
      user.getFriends()
       .then(function(friends){
         console.log('friends: ', friends);
       });
    })
    .catch(function (err) {
      console.error(err);
    });

    // Plurb.findAll({
    //   where: {
    //     UserGoogid: friendsGoogIds
    //   }
    // })
    //   .then(function (plurbs) {
    //     res.status(200).json(plurbs);
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });
  }
};
