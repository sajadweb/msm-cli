// command-line user interaction
const inquirer = require('inquirer');
const { trim } = require('lodash');

module.exports = {
    run: () => {
      const questions = [
        {
          name: 'service',
          type: 'input',
          message: 'Enter your Micro service:',
          validate: function( value ) {
            if ((trim(value)).length>1) {
                // TODO check has micro
              return true;
            } else {
              return 'Enter your Micro service.';
            }
          }
        },
        {
          name: 'model',
          type: 'confirm',
          message: 'Enter your Model name',
          validate: function(value) {
            if (value.length) {
              return true;
            } else {
              return 'Enter your Model name.';
            }
          }
        }
      ];
      return inquirer.prompt(questions);
    },
  };