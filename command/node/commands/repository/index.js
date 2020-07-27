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
    data: get(micro, "repositories", []),
    message: "Enter your new repository or Choice or from list:",
    error: "Enter your new repository.",
  };
  let cmd = await services.search(questions);

  const repository = cmd.name.toLowerCase();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "repositories")) {
        const fin = find(item.repositories, (i) => i === repository);
        if (!fin) {
          item.repositories.push(repository);
        }
      } else {
        if (item.name === micro.name) {
          item.repositories = [repository];
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
    name: repository,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("MSM Repository");
    await init(props, node);
  },
};
