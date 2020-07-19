const tools = require("./tools");
const init = (name) => {
  return `export const ${name.fUC()}= () => {}`;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Repository");
    const make = "repository";
    tools.run({ ilog, env, data, services, storeg, spinner, node, make, init });
  },
};
