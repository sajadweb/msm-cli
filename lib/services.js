// command-line user interaction
const chalk = require("chalk");
const inquirer = require("inquirer");
var fuzzy = require("fuzzy");
var _ = require("lodash");
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
const {trim}= _;

const searchApi = ({serach_data=[],add=true}) => (answers, input) => {
  input = input || "";
  return new Promise(function (resolve) {
    var fuzzyResult = fuzzy.filter(input, serach_data);
    if (add && input && _.trim(input).length > 0) {
      resolve([
        `${input}`,
        ...fuzzyResult.map(function (el) {
          return el.original;
        }),
      ]);
    } else {
      resolve(
        fuzzyResult.map(function (el) {
          return el.original;
        })
      );
    }
  });
};
module.exports = {
  chalk,
  confirm: async ({ name = "input", message = "Enter text:" } = props) => {
    return await inquirer.prompt([
      {
        name,
        type: "confirm",
        message: message,
      },
    ]);
  },
  input: async ({
    name = "input",
    message = "Enter text:",
    validate = function (value) {
      if (trim(value).length > 0) {
        return true;
      } else {
        return "Enter text!";
      }
    },
  } = props) => {
    const questions = [
      {
        name,
        type: "input",
        message: message,
        validate,
      },
    ];
    return await inquirer.prompt(questions);
  },
  search:async ({ name="name",message,error,data,add=true})=>{ 
      const questions = [
      {
        type: "autocomplete",
        name,
        suggestOnly: false,
        message: message,
        source: searchApi({serach_data:data,add}),
        pageSize: 5,
        validate: function (value) {
          if (_.trim(value).length > 0) {
            return true;
          } else {
            return error;
          }
        },
      },
    ];
    return await inquirer.prompt(questions);
 
  },
  error: (err) => console.log(error(err)),
  warning: (war) => console.log(warning(war)),
  prompt: inquirer.prompt,
  run: (env) => {
    const questions = [
      {
        name: "name",
        type: "list",
        choices: env.commands,
        message: "Choice your Micro service from list:",
        validate: function (value) {
          if (trim(value).length > 0) {
            return true;
          } else {
            return "Enter your Micro service.";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
