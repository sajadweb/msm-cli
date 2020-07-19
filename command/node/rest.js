const { trim, get, find } = require("lodash");
const ctrl = require("./controler");
const model = require("./model");
const repository = require("./repository");
const helper = require("./helper");
const request = require("./request");
const route = require("./route");



const fullDir = async ({ service, storeg, env, spinner }) => {
  spinner.load();
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/controller`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/controller/${service}.controller.js`,
    ctrl.init(service)
  );
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/model`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/model/${service}.model.js`,
    model.init(service)
  );
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/helper`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/helper/${service}.helper.js`,
    helper.init(service)
  );
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/repository`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/repository/${service}.repository.js`,
    repository.init(service)
  );
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/request`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/request/${service}.validation.js`,
    request.init(service)
  );
  await storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${service}/route`);
  await storeg.write(
    `${env.NODE_DIR}/${service}/route/${service}.route.js`,
    route.init(service)
  );
  spinner.finish();
};
const init = async ({ ilog, env, data, services, storeg, spinner }, node) => {
  const qs = [
    {
      name: "service",
      type: "input",
      message: "Enter the microservice name in lowercase (user):",
      validate: function (value) {
        if (trim(value).length > 1) {
          // TODO check has micro
          return true;
        } else {
          return "Enter the microservice name in lowercase.";
        }
      },
    },
  ];
  const answer = await services.prompt(qs);
  const dir = answer.service.toLowerCase();
  storeg.directoryUpdateOrNew(`${env.NODE_DIR}/${dir}`);

  const service = find(get(data, "services"), (item) => item.name === dir);
  if (service) {
    // TODO add in current service ?
    services.error("\n service exsit plase try agin!\n");
    node({ ilog, env, data, services, storeg, spinner });
  } else {
    await fullDir({ service: dir, storeg, env, spinner });
    //todo
  }
};

module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Rest Full");
    init({ ilog, env, data, services, storeg, spinner }, node);
  },
};
