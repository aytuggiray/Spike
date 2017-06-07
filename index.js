const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "-"
const Mongo = require('mongodb').MongoClient,
  assert = require('assert');
const url = 'mongodb://localhost:27017/spike';

var TOKEN = require('./config.json').token;

let songCommands = require('./components/lyric.js').commands;
let tipCommands = require('./components/tip.js').commands;
let usersCommands = require('./components/users.js').commands;

Mongo.connect(url, function(err, db) {
  this.db = db
  db.close()
})

// ~# On ready
bot.on('ready', function(onready) {
  console.log("\n Ready \n")
});

// Error
bot.on('error', (err) => {
  console.log(err)
})

// ~# St.
bot.on('message', function(message) {
  var messagePrefix = message.content.substring(0, 1);
  var messageContent = message.content.substring(1, (message.content.indexOf(" ") !== -1) ? message.content.indexOf(" ") : message.content.length);
  var messageParameters = message.content.substring((message.content.indexOf(" ") !== -1) ? message.content.indexOf(" ") : message.content.length, message.content.length);
  console.log(message.content)
  if ((messagePrefix === prefix) && !(message.author.equals(bot.user))) {
    switch (messageContent) {
      default: message.channel.send("Type \"-help\" for help ");
      break;
      case "help":
          var helpMessage = createHelpMessage();
        message.channel.send(helpMessage);
        break;
      case "getUsers":
          getUsers();
        break;
      case "createUser":
        //format fname|lname|lineage|reference|nickname
          createUser(usersCommands.createUser(messageParameters));
        break;
    }
  }
});

var createHelpMessage = () => {
  var message = "Hi, we don't have a help message yet!";
  return message;
}

function getUsers() {
  Mongo.connect(url, function(err, db) {
    //query = { 'nickname':'archeios' }
    query = {}
    var users
    db.collection("Users").find(query).toArray((err, result) => {
      users = result;
      console.log(result);
    })
    db.close();
    return users;
  })
}

function getUser(nickname) {
  Mongo.connect(url, function(err, db, nickname) {
    //query = { 'nickname':'archeios' }
    query = {
      'nickname': nickname
    }
    var user
    db.collection("Users").find(query).toArray((err, result) => {
      user = result;
      console.log(result);
    })
    db.close();
    return user;
  })
}

function createUser(user) {
  Mongo.connect(url, function(err, db) {
    db.collection("Users").insertOne(this.user, function(err, res) {
      console.log("Record created");
      db.close();
    })
  })
}

// ~# Login
bot.login(TOKEN);
