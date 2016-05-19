/* Database Configuration */
var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = null;

//if environment is production
if (process.env.CLEARDB_DATABASE_URL){
  //initialize db on production
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
  } else {
  //initialize db on localhost
  sequelize = new Sequelize('pluribus', 'root', '', {logging: false});
}

//The unique 'googid' property set by Google OAuth, it is NOT the 'id' set automatically by MySQL
var User = sequelize.define('User', {
  googid: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  picture: Sequelize.STRING,
});

var Topic = sequelize.define('Topic', {
  name: Sequelize.STRING,
});

var Plurb = sequelize.define('Plurb', {
  text: Sequelize.STRING,
  lat: Sequelize.DECIMAL(6,3),
  long: Sequelize.DECIMAL(6,3),
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  picture: Sequelize.STRING
});

//add many:many relationships between User and Topic
User.belongsToMany(Topic, {through: 'UserTopic'});
Topic.belongsToMany(User, {through: 'UserTopic'});

//sets the many:many self-association. Creates a 'UserFriends' table
User.belongsToMany(User, {as: 'Friends', through: 'UserFriends'});

//add one to many relationship between one user and many plurbs and one topic with many plurbs.
Plurb.belongsTo(User);
Plurb.belongsTo(Topic);

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop all existing tables and make new ones. ie: sequelize.sync({force: true});
sequelize.sync();

exports.User = User;
exports.Topic = Topic;
exports.Plurb = Plurb;
