const { trim } = require("lodash");
module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner,node,make,init }) => {
    let micro = await services.input({
      name: "service",
      message: "please enter your service name:",
      validate: function (value) {
        if (trim(value).length > 0) {
          return true;
        } else {
          return "please enter your service name!";
        }
      },
    });
    const service = micro.service;
    let cmd = await services.input({
      name: "name",
      message: `please enter your ${make} name:`,
      validate: function (value) {
        if (trim(value).length > 0) {
          return true;
        } else {
          return `please enter your ${make} name?`;
        }
      },
    });
    await spinner.load();
    let dir = `${env.NODE_DIR}/${service}`;
    await storeg.directoryUpdateOrNew(dir);
    dir = `${dir}/${make}`;
    await storeg.directoryUpdateOrNew(dir);
    dir = `${dir}/${cmd.name}.${make}.js`;
    if (storeg.directoryExists(dir)) {
      services.error(`error ${make} exsit`);
      spinner.finish();
      const con = await services.confirm({
        name: "has",
        message: "do you want make  " + cmd.name + " ?",
      });
      await spinner.load();
      if (!con.has) {
        spinner.finish();
        return node({ ilog, env, data, services, storeg, spinner });
      }
    }
    await storeg.write(dir, init(cmd.name), true);
    spinner.finish();
  },
};
