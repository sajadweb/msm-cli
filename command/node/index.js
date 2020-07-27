const { trim, get } = require("lodash");
const Types = require("./enum/index");
const app = require("./app");
const init = async ({
  ilog,
  env,
  data,
  services,
  storeg,
  spinner,
  SERVICE_DIR,
}) => {
  SERVICE_DIR.dirSplit().map((path) => {
    storeg.directoryUpdateOrNew(path);
  });
  const choices = [
    {
      name: "micro",
      type: "list",
      choices: Types.all,
      default: Types.FC,
      message: "Choice your Node Js component from list:",
      validate: function (value) {
        if (trim(value).length > 1) {
          // TODO check has micro
          return true;
        } else {
          return "Choice your Node Js component from list.";
        }
      },
    },
  ];
  const answer = await services.prompt(choices);
  get(app, get(answer, "micro")).run(
    { ilog, env, data, services, storeg, spinner,SERVICE_DIR },
    init
  );

};
module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }) => {
    ilog("Node Cli");
    init({
      ilog,
      env,
      data,
      services,
      storeg,
      spinner,
      SERVICE_DIR: env.NODE_DIR,
    });
  },
};
