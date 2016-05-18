var path = require('path');
var expect = require('chai').expect;
var request = require('supertest');
var Sequelize = require('sequelize');
var User = require('../db/dbconfig').User;
var Topic = require('../db/dbconfig').Topic;
var Plurb = require('../db/dbconfig').Plurb;
var userController = require('../controllers/userController');
var topicController = require('../controllers/topicController');
var plurbController = require('../controllers/plurbController');
var server = require(path.join(__dirname, '..', './server.js')).app;
var app = require('../server').app;

describe('server', function () {
  'use strict';

  it('exists', function () {
    expect(server).to.be.a('function');
  });

  it('Port should be 3000 if server is running on local host', function () {
    var port;
    if (!process.env.port) {
      port = 3000;
      expect(port).to.equal(3000);
    }
  });
});

describe('Invalid Routes', function () {
  // test that proper error code is recieved for invalid url
  it('Should return error', function (done) {
    request(app)
    .get('/abc')
    .expect(404)
    .end(done);
  });
});

/* User Tests */
//User Controllers
describe('User Controllers', function () {
  describe('getAllUsers()', function () {
    it('should be a function', function () {
      expect(userController.getAllUsers).to.exist;
      expect(userController.getAllUsers).to.be.a('function');
    });
  });
  describe('getUser()', function () {
    it('should be a function', function () {
      expect(userController.getUser).to.exist;
      expect(userController.getUser).to.be.a('function');
    });
  });
  describe('findOrCreateUser()', function () {
    it('should be a function', function () {
      expect(userController.findOrCreateUser).to.exist;
      expect(userController.findOrCreateUser).to.be.a('function');
    });
  });
  describe('addFriend()', function () {
    it('should be a function', function () {
      expect(userController.addFriend).to.exist;
      expect(userController.addFriend).to.be.a('function');
    });
  });
  describe('getFriends()', function () {
    it('should be a function', function () {
      expect(userController.getFriends).to.exist;
      expect(userController.getFriends).to.be.a('function');
    });
  });
  describe('removeFriend()', function () {
    it('should be a function', function () {
      expect(userController.removeFriend).to.exist;
      expect(userController.removeFriend).to.be.a('function');
    });
  });
});

//User Routes
describe('API routes GET users is functioning', function () {
  var newUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
  };

  beforeEach(function (done) {
    User.sync()
    .then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    User.create(newUser)
    .then(function () {
      done();
    });
  });

  it('responds with a 200 (OK)', function (done) {
    request(app)
      .get('api/user')
      .expect(200);
      done();
  });
});

describe('It should GET all users', function (){
    var idCount;
    var newUser = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
  };
  
  //get last id count
  // before(function (done) {
  //   request(app)
  //   .get('/api/user')
  //   .end(function (res){
  //     idCount = res.body;
  //     done();
  //   });
  // });
  //   console.log("idCount: ", idCount);
  //create new user
  //get last id count
  //compare it
    //should be total+1
});

describe('API route POST users', function () {
  var newUser = {
    firstName: 'Post',
    lastName: 'Tester',
    email: 'pt@gmail.com',
  };

  beforeEach(function (done) {
    User.sync()
    .then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    User.create(newUser)
    .then(function () {
      done();
    });
  });

  it('responds with a 200 (OK)', function (done) {
    request(app)
      .post('api/user')
      .expect(201);
      done();
  });
});

/* Topic Tests */
//Topic Controllers
describe('Topic Controllers', function () {
  describe('getAllTopics()', function () {
    it('should be a function', function () {
      expect(topicController.getAllTopics).to.exist;
      expect(topicController.getAllTopics).to.be.a('function');
    });
  });
  describe('createTopic', function () {
    it('should be a function', function () {
      expect(topicController.createTopic).to.exist;
      expect(topicController.createTopic).to.be.a('function');
    });
  });
  describe('getTopicByName()', function () {
    it('should be a function', function () {
      expect(topicController.getTopicByName).to.exist;
      expect(topicController.getTopicByName).to.be.a('function');
    });
  });
  describe('deleteTopic', function () {
    it('should be a function', function () {
      expect(topicController.deleteTopic).to.exist;
      expect(topicController.deleteTopic).to.be.a('function');
    });
  });
});

describe('API routes GET topics', function () {

  var newTopic = {
    name: 'Animal Rights'
  };

  beforeEach(function (done) {
    Topic.sync()
    .then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    Topic.create(newTopic)
    .then(function () {
      done();
    });
  });

  it('responds with a 200 (OK)', function (done) {
    request(app)
      .get('api/topic')
      .expect(200);
      done();
  });
});

/* Plurb Tests */
//Plurb Controllers
describe('Plurb Controllers', function () {
  describe('getAllPlurbs()', function () {
    it('should be a function', function () {
      expect(plurbController.getAllPlurbs).to.exist;
      expect(plurbController.getAllPlurbs).to.be.a('function');
    });
  });
  describe('createPlurb', function () {
    it('should be a function', function () {
      expect(plurbController.createPlurb).to.exist;
      expect(plurbController.createPlurb).to.be.a('function');
    });
  });
  describe('getPlurb()', function () {
    it('should be a function', function () {
      expect(userController.createUser).to.exist;
      expect(userController.createUser).to.be.a('function');
    });
  });
  describe('deletePlurb()', function () {
    it('should be a function', function () {
      expect(userController.createUser).to.exist;
      expect(userController.createUser).to.be.a('function');
    });
  });
});

describe('API routes GET plurbs', function () {

  var newPlurb = {
    text: 'I am a test Plurb. We will change the world!',
    location: 'New York'
  };

  beforeEach(function (done) {
    Plurb.sync()
    .then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    Plurb.create(newPlurb)
    .then(function () {
      done();
    });
  });

  it('responds with a 200 (OK)', function (done) {
    request(app)
      .get('api/plurb')
      .expect(200);
      done();
  });
});
