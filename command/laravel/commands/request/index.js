const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/request");
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
    data: get(micro, "requests", []),
    message: "Enter your new request or Choice or from list:",
    error: "Enter your new request.",
  };
  let cmd = await services.search(questions);

  const request = cmd.name.fUC();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "requests")) {
        const fin = find(item.requests, (i) => i === request);
        if (!fin) {
          item.requests.push(request);
        }
      } else {
        if (item.name === micro.name) {
          item.requests = [request];
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
    props.ilog("request");
    await init(props, node);
  },
};
