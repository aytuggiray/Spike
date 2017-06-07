var user = {
  'fname':null,
  'lname':null,
  'nickname':null,
  'lineage':null,
  'reference':null
}
var prefix = "-";
exports.commands = {
  ping: function(bot,message) {
    (message.content===prefix+"ping") ? message.channel.send("ping function PONG") : null;
  },
  addTip: function(message) {
    if(message.content === prefix+"ping"){
      message.channel.send("addTip function PONG");
    } else {
      null
    }
  },
  printUsers: function(Users, message){
    //message.channel.send(Users);
    Users.map(function(user,index){
      message.channel.send(user.fname + " " + user.lname + " " + user.nickname + " " + user.lineage + " " +user.reference)
    })
  },
  insertUser: function(firstName,lastName,nickname,lineage,reference){

    user = { 'fname':firstName,'lname':lastName,'lineage':lineage,'reference':reference,'nickname':nickname}
    return user;
    //push to MongoDB
  }
}
