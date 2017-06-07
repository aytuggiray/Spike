const Mongo = require('mongodb').MongoClient,
  spike = require('assert');
const url = 'mongodb://localhost:27017/spike'

exports.mongodb = {
  getUsers: Mongo.connect(url, getUsers(err,db)),
  getUser: Mongo.connect(url, getUser(err,db,nickname)),
  createUser: Mongo.connect(url, createUser(err,db,user))
}

var getUsers(err, db) => {
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
}

var getUser(err, db, nickname) => {
  //query = { 'nickname':'archeios' }
  query = { 'nickname':nickname }
  this.db = db
  var user
  db.collection("Users").find(query).toArray((err, result) => {
    user = result;
    console.log(result);
  })
  db.close();
  return user;
}

var createUser(user) => {
  db.collection("Users").insertOne(user, (err,res) => {
    console.log("Record created");
    db.close();
  })
}
