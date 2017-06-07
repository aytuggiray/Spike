var tiprefix = '-'
var tip = {
    //Commands are here
    'commands': [
 /*0*/  tiprefix+'tip',
 /*1*/  tiprefix+'top',
 /*2*/  tiprefix+'rate',
 /*3*/  tiprefix+'list'
    ]
};
    
// ~# On ready
exports.commands = {
    // ~# Main
    onTip: function(message) {
        (message.content == tip.commands[0]) ?  null: null; 
    },
    // ~# Child
    // ..
}