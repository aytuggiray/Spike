var user = {
  //'_id': null,
  'fname': null,
  'lname': null,
  'nickname': null,
  'lineage': null,
  'reference': null
}
var prefix = "-";
exports.commands = {
  ping: function(bot, message) {
    (message.content === prefix + "ping") ? message.channel.send("ping function PONG"): null;
  },
  addTip: function(message) {
    if (message.content === prefix + "ping") {
      message.channel.send("addTip function PONG");
    } else {
      null
    }
  },
  printUsers: function(Users, message) {
    //message.channel.send(Users);
    Users.map(function(user, index) {
      message.channel.send(user.fname + " " + user.lname + " " + user.nickname + " " + user.lineage + " " + user.reference)
    })
  },
  createUser: function(userStringWithOrOperandAsSplitter) {
    var firstName;
    var lastName;
    var lineage;
    var reference;
    var nickname;
    [firstName, lastName, lineage, reference, nickname] = userStringWithOrOperandAsSplitter.split("|");
    user = {
      'fname': firstName,
      'lname': lastName,
      'lineage': lineage,
      'reference': reference,
      'nickname': nickname
    }
    return user;
    //push to MongoDB
  }
}
