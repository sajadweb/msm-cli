const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/model");
const cli = require("../../lib/lib");

const init = async (
  { ilog, env, data, services, storeg, spinner, service, SERVICE_DIR },
  node
) => {
  let micro;
  if (service) {
    var result = data.services.find((item) => item.name.fUC() === service);
    if (result) {
      micro = result;
    } else {
      micro = { name: service };
    }
  } else {
    micro = await cli.getService({
      env,
      services,
      storeg,
      SERVICE_DIR,
      data,
    });
  }
  const questions = {
    name: "name",
    data: get(micro, "models", []),
    message: "Enter your new model or Choice or from list:",
    error: "Enter your new models.",
  };
  let cmd = await services.search(questions);

  const model = cmd.name.fUC();
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
  return model;
};

module.exports = {
  run: async (props, node) => {
    if (props.full) props.ilog("Model");
    return await init(props, node);
  },
};
