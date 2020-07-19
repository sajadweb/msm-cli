const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/provider");
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
    data: get(micro, "providers", []),
    message: "Enter your new provider or Choice or from list:",
    error: "Enter your new providers.",
  };
  let cmd = await services.search(questions);

  const provider = cmd.name.fUC();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "providers")) {
        const fin = find(item.providers, (i) => i === provider);
        if (!fin) {
          item.providers.push(provider);
        }
      } else {
        if (item.name === micro.name) {
          item.providers = [provider];
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
    name: provider,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("provider");
    await init(props, node);
  },
};
