const { trim, get, has, map, find } = require("lodash");
const helpers = require("../helper/content");
const controller = require("../controller/content");
const model = require("../model/content");
const repository = require("../repository/content");
const route = require("../route/content");
const test = require("../test/content");
const request = require("../request/content");

const init = async (
  { ilog, env, data, services, storeg, spinner, SERVICE_DIR },
  node
) => {
  let micro = await services.input({
    name: "name",
    message: "Enter your Micro service:",
    validate: function (value) {
      if (trim(value).length > 0) {
        return true;
      } else {
        return "Enter your Micro service!";
      }
    },
  });
  let service = micro.name.toLowerCase();
  const fin = find(get(data, "services", []), (serv) => {
    if (get(serv, "name").toLowerCase() === service.toLowerCase()) {
      return serv;
    }
    return false;
  });
  if (fin) {
    services.error(`\n service ${service} exsit;\n`);
    let confirm = await services.confirm({
      name: "has",
      message: "do you want over right?",
    });
    if (!confirm.has) {
      return node(
        { ilog, env, data, services, storeg, spinner, SERVICE_DIR },
        node
      );
    }
  }
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${service}`);
  data.services= data.services.filter(f=>f.name!==service );
  await controller.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  await helpers.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  await model.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  await repository.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  await route.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  await test.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  }); 
  await request.setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: service,
    name: service,
    full:true
  });
  data.services.push({
    name:service,
    controllers:[service],
    helpers:[service],
    models:[service],
    providers:[service],
    repositories:[service],
    routes:[service],
    requests:[service],
    tests:[service]
  })
  storeg.writeJson(env.config, data);

};

module.exports = {
  run: async (props, node) => {
    props.ilog("MSM Api");
    await init(props, node);
  },
};
