const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/route");
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
    data: get(micro, "routes", []),
    message: "Enter your new route or Choice or from list:",
    error: "Enter your new route.",
  };
  let cmd = await services.search(questions);

  const route = cmd.name.fUC();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "routes")) {
        const fin = find(item.routes, (i) => i === route);
        if (!fin) {
          item.routes.push(route);
        }
      } else {
        if (item.name === micro.name) {
          item.routes = [route];
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
    name: route,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("route");
    await init(props, node);
  },
};
