const { trim } = require("lodash");
const tools = require("./tools/index");

const init = (name) => {
  return `export const ${name.fUC()}= () => {}`;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Helper");
    const make= 'helper';
    tools.run({ ilog, env, data, services, storeg, spinner,node,make,init })
  },
};
