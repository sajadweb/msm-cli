const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/controller");
const cli = require("../../lib/lib");

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
    message: "Enter your new Controller or Choice or from list:",
    error: "Enter your new Controller.",
  };
  let cmd = await services.search(questions);
  const ctrl = cmd.name.fUC();

  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "controllers")) {
        const fin = find(item.controllers, (i) => i === ctrl);
        if (!fin) {
          item.controllers.push(ctrl);
        }
      } else {
        if (item.name === micro.name) {
          item.controllers = [ctrl];
        }
      }
    }
    return item;
  });
  storeg.writeJson(env.config, data);
  await setContext({
    ilog,
    env,
    spinner,
    SERVICE_DIR,
    data,
    services,
    storeg,
    node,
    micro: micro.name,
    name:ctrl,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("Controller");
    await init(props, node);
  },
};
