const CLI = require('clui'),Spinner = CLI.Spinner;
var countdown = new Spinner('Exiting in ...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

module.exports = {
    load:()=>countdown.start(),
    finish:()=>countdown.stop(),
}