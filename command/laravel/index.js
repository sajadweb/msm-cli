const { trim, get } = require("lodash");
const Types = require("./enum/index");
const command = require("./command");

// // command-line user interaction
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
      message: "Choice your LARAVEL component from list:",
      validate: function (value) {
        if (trim(value).length > 1) {
          // TODO check has micro
          return true;
        } else {
          return "Choice your LARAVEL component from list.";
        }
      },
    },
  ];
  const answer = await services.prompt(choices);
  console.log(get(answer, "micro"));
  get(command, get(answer, "micro")).run(
    { ilog, env, data, services, storeg, spinner,SERVICE_DIR },
    init
  );
};
module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }) => {
    ilog("Init Laravel^");
    init({
      ilog,
      env,
      data,
      services,
      storeg,
      spinner,
      SERVICE_DIR: env.LARAVEL_DIR,
    });
  },
};
