const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/repository");
const cli = require("../../lib/lib");

const init = async (
  { ilog, env, data, service, services, storeg, spinner, SERVICE_DIR },
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
    data: get(micro, "repositories", []),
    message: "Enter your new repository or Choice or from list:",
    error: "Enter your new repository.",
  };
  let cmd = await services.search(questions);

  const repository = cmd.name.fUC();
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
    ilog,
    env,
    spinner,
    SERVICE_DIR,
    data,
    services,
    storeg,
    node,
    micro: micro.name,
    name: repository,
  });
  return repository;
};

module.exports = {
  run: async (props, node) => {
    if (!props.service) props.ilog("repository");
    return await init(props, node);
  },
};
