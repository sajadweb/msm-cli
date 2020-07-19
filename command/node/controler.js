const { trim } = require("lodash");

const init = (name) => {
  return `
const  ${name.fUC()}Ctrl = new (class ${name.fUC()}Controller {
async index(req, res) {
    try {
    } catch (e) {}
}

async show(req, res) {
    try {
    } catch (e) {}
}

async insert(req, res) {
    try {
    } catch (e) {}
}

async update(req, res) {
    try {
    } catch (e) {}
}

async destroy(req, res) {
    try {
    } catch (e) {}
}
})();

export default ${name.fUC()}Ctrl;
      `;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Contoroller");
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
    let ctrl = await services.input({
      name: "name",
      message: "please enter your controller name:",
      validate: function (value) {
        if (trim(value).length > 0) {
          return true;
        } else {
          return "please enter your controller name!";
        }
      },
    });
    await spinner.load();
    let dir = `${env.NODE_DIR}/${service}`;
    await storeg.directoryUpdateOrNew(dir);
    dir = `${dir}/controller`;
    await storeg.directoryUpdateOrNew(dir);
    dir = `${dir}/${ctrl.name}.controller.js`;
    if (storeg.directoryExists(dir)) {
      services.error("error controller exsit");
      spinner.finish();
      const cm =await services.confirm({
        name: "has",
        message: "do you want make  "+ ctrl.name+" ?",
      });
      await spinner.load();
      if (!cm.has) {
        spinner.finish();
        return node({ ilog, env, data, services, storeg, spinner });
      }
    }
    await storeg.write(dir, init(ctrl.name),true);
    spinner.finish();
  },
};
