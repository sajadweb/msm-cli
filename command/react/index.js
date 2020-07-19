const { trim, get } = require("lodash");
const Types = require("./enum/index");
const command = require("./command");

// // command-line user interaction
const init = async ({ ilog, env, data, services, storeg, spinner }) => {
  storeg.directoryUpdateOrNew(`./src`);
  storeg.directoryUpdateOrNew(`./src/${env.REACT_DIR}`);
  const choices = [
    {
      name: "micro",
      type: "list",
      choices: Types.all,
      default: Types.FC,
      message: "Choice your React component from list:",
      validate: function (value) {
        if (trim(value).length > 1) {
          // TODO check has micro
          return true;
        } else {
          return "Choice your React component from list.";
        }
      },
    },
  ];
  const answer = await services.prompt(choices);
  console.log(get(answer, "micro"));
  get(command, get(answer, "micro")).run(
    { ilog, env, data, services, storeg, spinner },
    init
  );
};
module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }) => {
    ilog("Init React^");
    init({ ilog, env, data, services, storeg, spinner });
  },
};
