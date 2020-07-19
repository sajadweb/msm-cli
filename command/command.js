const { get, has } = require("lodash");
const kernel = require("./kernel");
//todo check?
const run = async ({ ilog, env, data, services, storeg, spinner }, newInit) => {
  if (!has(data, "name")) {
    const service = await services.run(env);
    if (newInit) {
      spinner.load();
      data = {
        name: get(service, "name"),
        version: "1.0.0",
        services: [],
      };
      await storeg.writeJson(`./${env.config}`, data);
      spinner.finish();
    }
  }
  if (has(kernel, `${get(data, "name")}.run`)) {
    // call command in kernel
    get(
      kernel,
      `${get(data, "name")}.run`
    )({ ilog, env, data, services, storeg, spinner });
  } else {
    console.log("The service was not found" + `${get(data, "name")}.run()`);
  }
};
const init = ({ ilog, env, data, services, storeg, spinner }) => {
  // // loading start
  spinner.load();
  // check dirctory
  if (storeg.directoryExists(`./${env.config_dir}`)) {
    // check config
    if (storeg.directoryExists(`./${env.config}`)) {
      data = storeg.readJsonSync(`./${env.config}`);
      spinner.finish();
      // TODO choice command
      run({ ilog, env, data, services, storeg, spinner });
    } else {
      spinner.finish();
      run({ ilog, env, data, services, storeg, spinner }, "init");
    }
  } else {
    storeg.makeDirectory(env.config_dir);
    spinner.finish();
    run({ ilog, env, data, services, storeg, spinner }, "init");
  }
};

module.exports = {
  // TODO add any command in route auth commit
  app: ({ ilog, data, env, services, storeg, spinner }) => {
    init({ ilog, data, env, services, storeg, spinner });
  },
};
