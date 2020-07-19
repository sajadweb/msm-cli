const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/helper");
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
    data: get(micro, "helpers", []),
    message: "Enter your new helper or Choice or from list:",
    error: "Enter your new helper.",
  };
  let cmd = await services.search(questions);

  const helper = cmd.name.fUC();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "helpers")) {
        const fin = find(item.helpers, (i) => i === helper);
        if (!fin) {
          item.helpers.push(helper);
        }
      } else {
        if (item.name === micro.name) {
          item.helpers = [helper];
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
    name: helper,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("Helper");
    await init(props, node);
  },
};
