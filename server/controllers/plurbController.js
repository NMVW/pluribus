var Plurb = require('../db/dbconfig').Plurb;
var User = require('../db/dbconfig').User;
var Topic = require('../db/dbconfig').Topic;

module.exports = {
  getAllPlurbs: function (req, res) {
    Plurb.findAll({
       include: [Topic]
    })
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
    var googId = req.body.googId;
    var topicId = req.body.topicId;
    var minLat = req.body.mapBounds.minLat;
    var maxLat = req.body.mapBounds.maxLat;
    var minLng = req.body.mapBounds.minLng;
    var maxLng = req.body.mapBounds.maxLng;
    var query = {};
  //builds query object based off the presences of googId and/or topicId
    if(!topicId && !googId) {
  //if topic id is 0 and there is no googId, send back all plurbs in that location regardless of topic
      query = {
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]}
        }
      };
    } else if (!topicId) {
      query = {
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]},
          UserGoogid: googId
        }
      };
    } else if (!googId) {
      query = {
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]},
          TopicId: topicId,
        }
      };      
    } else {
      query = {
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]},
          TopicId: topicId,
          UserGoogid: googId
        }
      }; 
    }

    Plurb.findAll(query)
    .then(function (plurbs) {
      res.status(200).json(plurbs);
    })
    .catch(function (err) {
      console.error (err);
    });
  },

  getAllFriendsAllPlurbs: function (req, res) {
    var googId = req.session.user;
    var friendsGoogIds = [];

    //Create array of all friends googIds
    User.find({where: {googid: googId}})
    .then(function(user) {
      //this built in Sequelize method will pull all friends
      user.getFriends()
       .then(function(friends){
        friends.forEach(function(friend) {
          //push each friend googid to the array
          friendsGoogIds.push(Number(friend.dataValues.googid));
        });
       })
       .then(function(){
        //find all plurbs that have the friend googIds as UserGoogId (meaning they authored the plurb)
          Plurb.findAll({
            where: {
              $or: [
                {UserGoogid: friendsGoogIds}
              ]
            }
          })
            .then(function (plurbs) {
              res.status(200).json(plurbs);
            })
            .catch(function (err) {
              console.error(err);
            });
       });
    })
    .catch(function (err) {
      console.error(err);
    });
  }
};
