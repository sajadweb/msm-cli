const clear = require("clear");
const figlet = require("figlet");
const chalk = require("chalk");

// if (files.directoryExists('.git')) {
//     console.log(chalk.red('Already a Git repository!'));
//    // process.exit();
// }

// const run = async () => {
//     const credentials = await inquirer.askGithubCredentials();
//     console.log(credentials);
//   };
// run();

// const inquirer = require("./lib/node");
// const run = async () => {
//   const node = await inquirer.run();
//   console.log(node);
// };
// run();

module.exports = {
  run: () => {
    clear();
    console.log(
      chalk.yellow(figlet.textSync("Micro Cli", { horizontalLayout: "full" }))
    );
  },
  show: (micro) => {
    clear();
    console.log(
      chalk.green(
        figlet.textSync(micro, { horizontalLayout: "full" })
      )
    );
  },
};
