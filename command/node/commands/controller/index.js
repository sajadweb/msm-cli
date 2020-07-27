const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("./content");
const cli = require("../../lib");

const init = async (
  { ilog, env, data, services, storeg, spinner, SERVICE_DIR },
  node
) => {
  let micro = await cli.getService({
    env,
    services,
    storeg,
    SERVICE_DIR,
    data,
  });
  const questions = {
    name: "name",
    data: get(micro, "controllers", []),
    message: "Enter your new controller or Choice or from list:",
    error: "Enter your new controller.",
  };
  let cmd = await services.search(questions);

  const controller = cmd.name.toLowerCase();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "controllers")) {
        const fin = find(item.controllers, (i) => i === controller);
        if (!fin) {
          item.controllers.push(controller);
        }
      } else {
        if (item.name === micro.name) {
          item.controllers = [controller];
        }
      }
    }
    return item;
  });
  storeg.writeJson(env.config, data);
  await setContext({
    SERVICE_DIR,
    data,
    services,
    storeg,
    micro: micro.name,
    name: controller,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("MSM Controller");
    await init(props, node);
  },
};
