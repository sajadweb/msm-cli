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
    data: get(micro, "request", []),
    message: "Enter your new request or Choice or from list:",
    error: "Enter your new request.",
  };
  let cmd = await services.search(questions);

  const request = cmd.name.toLowerCase();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "request")) {
        const fin = find(item.request, (i) => i === request);
        if (!fin) {
          item.request.push(request);
        }
      } else {
        if (item.name === micro.name) {
          item.request = [request];
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
    name: request,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("Request");
    await init(props, node);
  },
};
