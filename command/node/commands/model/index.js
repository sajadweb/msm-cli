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
    data: get(micro, "models", []),
    message: "Enter your new model or Choice or from list:",
    error: "Enter your new model.",
  };
  let cmd = await services.search(questions);

  const model = cmd.name.toLowerCase();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "models")) {
        const fin = find(item.models, (i) => i === model);
        if (!fin) {
          item.models.push(model);
        }
      } else {
        if (item.name === micro.name) {
          item.models = [model];
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
    name: model,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("MSM Model");
    await init(props, node);
  },
};
