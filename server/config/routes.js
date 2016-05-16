var userController = require('../controllers/userController');
var topicController = require('../controllers/topicController');
var plurbController = require('../controllers/plurbController');
var Purest = require('purest');

var google = new Purest({ provider: 'google' });

module.exports = function (app) {
  /* User Routes */
  app.route('/api/users')
    .get(userController.getAllUsers);

    //find or delete a user based off their unique Google ID
  app.route('/api/user/:googid')
    .get(userController.getUser)
    .post(userController.findOrCreateUser);

    //find or add user friends
  app.route('/api/friend')
    .post(userController.addFriend);
    //TODO: uncomment and fleshout method
    //.get(userController.getFriends)

  /* Topic Routes */
  app.route('/api/topic')
    .get(topicController.getAllTopics)
    .post(topicController.findOrCreateTopic);

  app.route('/api/topic/:topicName')
    .get(topicController.getTopicByName)
    .post(topicController.deleteTopic);
  
  /* Plurb Routes */
  app.route('/api/plurb')
    .post(plurbController.createPlurb);

  app.route('/api/plurbs')
    .post(plurbController.getPlurbsByLocation);

  app.route('/api/plurb/:plurbId')
    .get(plurbController.getPlurb)
    .post(plurbController.deletePlurb);

  app.route('/api/plurbs/:googId')
    .get(plurbController.getPlurbsByGoogId);

  //callback route for OAuth
  app.route('/callback')
    .get(function (req, res) {
      google.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json', {
        auth: { bearer: req.session.grant.response.access_token },
      }, function (err, nope, body) {
        userController.findOrCreateUser(body, function (user) {
          //sets session to Google ID
          req.session.user = user[0].dataValues.googid;
          // notify client of successful authentication
          var authenticated = encodeURIComponent(true);
          res.redirect('/?authenticated=' + authenticated);
        });
      });
    });

  app.route('/logout')
    .get(function (req, res) {
      req.session.destroy(function (err) {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/');
        }
      });
    });
};
