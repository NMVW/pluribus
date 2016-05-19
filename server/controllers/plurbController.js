var Plurb = require('../db/dbconfig').Plurb;
var User = require('../db/dbconfig').User;
var Topic = require('../db/dbconfig').Topic;

module.exports = {

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

  // // Is this handler ever used on FE?
  // getPlurb: function (req, res) {
  //   var plurbId = req.params.plurbId;
  //   Plurb.findById(plurbId)
  //   .then(function (plurb) {
  //     res.status(200).json(plurb);
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //   });
  // },

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

  getPlurbsByLocation: function (req, res) {
    
    // OPTIONAL PARAMS
    // search terms
    var selectedUID = req.body.googId;
    var selectedTopicId = req.body.topicId;
    var clientUID = req.session.user;
    
    
    // REQUIRED PARAMS
    var minLat = req.body.mapBounds.minLat;
    var maxLat = req.body.mapBounds.maxLat;
    var minLng = req.body.mapBounds.minLng;
    var maxLng = req.body.mapBounds.maxLng;
    var filter = req.body.filter; // filter state of app
    
    var query = {};
    var promised = false;
    
    //////////////////////////// FILTER set to FRIENDS ///////////////////////
    if (filter === 'FRIENDS') {
      
      // if selectedUID is undefined
      if (selectedUID === undefined) {
        // DEFAULT send plurbs of user's friends
        var friendsGoogIds = [];

        // Find user's friends' googIds
        User.find({where: {googid: clientUID}})
        .then(function(user) {
          // pull all friends
          user.getFriends()
          .then(function(friends){
            friendsGoogIds = friends.map(function(friend) {
              return Number(friend.dataValues.googid);
            });
            // final get all plurbs of user's friends query
            query = {
              include: [Topic],
              where: {
                lat: {$between: [minLat, maxLat]},
                long: {$between: [minLng, maxLng]},
                UserGoogid: {$in: friendsGoogIds}
              }
            };
          });
        })
        .then(function() {
          // SEND friends' plurbs in PROMISE CHAIN!!
          Plurb.findAll(query)
          .then(function (plurbs) {
            console.log('here are all friends plurbs', plurbs.map(function(plurb) {
              return plurb.dataValues.firstName;
            }));
            res.status(200).json(plurbs);
            promised = true;
          })
          .catch(function (err) {
            console.error (err);
          });
        })
        .catch(function(err) {
          console.error(err);
        });
      }
    } else {
      // SEARCH plurbs of selectedUID
      query = {
        include: [Topic],
        where: {
          lat: {$between: [minLat, maxLat]},
          long: {$between: [minLng, maxLng]},
          UserGoogid: selectedUID,
        }
      };      
    }
    
    //////////////////////////// FILTER set to TOPICS ///////////////////////
    if (filter === 'TOPICS') {
      
      // if selectedTopicId is undefined
      if (selectedTopicId === undefined) {
        // DEFAULT send all plurbs
        query = {
          include: [Topic],
          where: {
            lat: {$between: [minLat, maxLat]},
            long: {$between: [minLng, maxLng]},
          }
        }; 
        
      } else {
        // SEARCH plurbs of selectedTopicId
        query = {
          include: [Topic],
          where: {
            lat: {$between: [minLat, maxLat]},
            long: {$between: [minLng, maxLng]},
            TopicId: selectedTopicId,
          }
        };       
      }
    }
    
    // Use built query to find plurbs
    if (!promised) { // make sure res was not already sent
      Plurb.findAll(query)
      .then(function (plurbs) {
        console.log('here are all plurbs', plurbs.map(function(plurb) {
          return plurb.dataValues.text;
        }));
        res.status(200).json(plurbs);
      })
      .catch(function (err) {
        console.error (err);
      }); 
    }
  },
};
