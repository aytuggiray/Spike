const Discord = require('discord.js');
const bot = new Discord.Client();
const Mongo = require('mongodb').MongoClient,
  test = require('assert');
var url = 'mongodb://localhost:27017/test'
var TOKEN = require('./config.json').token;
var db;

const prefix = "-"

let songCommands = require('./components/lyric.js').commands;
let tipCommands = require('./components/tip.js').commands;
let usersCommands = require('./components/users.js').commands;

var Users;

Mongo.connect(url, function(err,db){
  //query = { 'nickname':'archeios' }
  query = {}
  this.db = db
  //create a function for this to get the updated users.
  db.collection("Users").find(query).toArray(function(err, result){
    Users = result;
    console.log(result)
  })
  db.close()

})

// ~# On ready
bot.on('ready',function(onready){
    console.log("\n Ready \n")
});

// Error
bot.on('error',(err)=>{
  console.log(err)
})

// ~# St.
bot.on('message',function(message){
    //usersCommands
    (message.content===prefix+"printUsers") ? usersCommands.printUsers(Users, message) : null;
    if(message.content.substring(0,"insertUser".length+1)===prefix+"insertUser"){
      //format Berkan|Yavri|Archeios|0|0
      var params = message.content.substring("insertUser".length+2,message.content.length).split("|");
      var firstName = params[0]
      var lastName = params[1]
      var nickname = params[2]
      var lineage = params[3]
      var reference = params[4]
      /*
      params.map(function(item,index){
        console.log(item)
      })
      */
      Mongo.connect(url, function(err,db){
        db.collection("Users").insertOne(usersCommands.insertUser(firstName,lastName,nickname,lineage,reference), function(err,res){
          console.log("Record created")
          db.close()
        })
      })
    }
});






// ~# Login
bot.login(TOKEN);
