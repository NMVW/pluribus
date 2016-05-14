var Topic = require('../db/dbconfig').Topic;

module.exports = {
  getAllTopics: function (req, res) {
    Topic.findAll({})
    .then(function (topics) {
      res.status(200).json(topics);
    })
    .catch(function (err) {
      console.error(err);
    });
  },
  
  findOrCreateTopic: function (req, res) {
    var topicData = {
      name: req.body.name.toUpperCase()
    };
    Topic.findOrCreate({where: topicData})
    .then(function (topic) {
      res.status(201).json(topic);
    })
    .catch(function (err) {
      console.error (err);
    });
  },

  getTopicByName: function (req, res) {
    var topicName = req.params.topicName;
    Topic.find({
      where: {name: topicName}
    })
    .then(function (topic) {
      res.status(200).json(topic);
    })
    .catch(function (err) {
      console.error (err);
    });
  },

  deleteTopic: function (req, res) {
    var topicName = req.params.topicName;
    Topic.destroy({
      where: {name: topicName}
    })
    .then(function () {
      res.status(201);
    })
    .catch(function (err) {
      console.error (err);
    });
  },
};
