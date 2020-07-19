const { trim, get, has, map, find } = require("lodash");
const { setContext } = require("../../lib/test");
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
    data: get(micro, "tests", []),
    message: "Enter your new test or Choice or from list:",
    error: "Enter your new test.",
  };
  let cmd = await services.search(questions);

  const test = cmd.name.fUC();
  data.services = map(data.services, (item) => {
    if (micro.name === item.name) {
      if (has(item, "tests")) {
        const fin = find(item.tests, (i) => i === test);
        if (!fin) {
          item.tests.push(test);
        }
      } else {
        if (item.name === micro.name) {
          item.tests = [test];
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
    name: test,
  });
};

module.exports = {
  run: async (props, node) => {
    props.ilog("test");
    await init(props, node);
  },
};
