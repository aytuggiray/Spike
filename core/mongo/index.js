const Mongo = require('mongodb').MongoClient,
  spike = require('assert');
const url = 'mongodb://localhost:27017/spike';

exports.mongodb = function() {

  function getUsers() {
    Mongo.connect(url, function(err, db) {
      //query = { 'nickname':'archeios' }
      query = {}
      this.db = db
      var users
      db.collection("Users").find(query).toArray((err, result) => {
        users = result;
        console.log(result);
      })
      db.close();
      return users;
    })
  }

  function getUser() {
    Mongo.connect(url, function(err, db, nickname) {
      //query = { 'nickname':'archeios' }
      query = {
        'nickname': nickname
      }
      this.db = db
      var user
      db.collection("Users").find(query).toArray((err, result) => {
        user = result;
        console.log(result);
      })
      db.close();
      return user;
    })
  }

  function createUser() {
    Mongo.connect(url, function(user) {
      db.collection("Users").insertOne(user, (err, res) => {
        console.log("Record created");
        db.close();
      })
    })
  }
}
