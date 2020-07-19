const tools = require("./tools");
const init = (name) => {
  return `import express from 'express';
import ${name}Controller from '../controller/${name}.controller';
import ${name}Validation from '../request/${name}.validation';
const ${name}Router = express.Router();
// Get ${name.fUC()}s
${name}Router.get('/', ${name}Validation.get${name.fUC()}, ${name}Controller.get${name.fUC()});
// Get ${name.fUC()}
${name}Router.get(
'/${name}/:${name}Id',
${name}Validation.get${name.fUC()},
${name}Controller.get${name.fUC()},
);
// Insert ${name.fUC()}
${name}Router.post(
'/${name}',
${name}Validation.insert${name.fUC()},
${name}Controller.insert${name.fUC()},
);
// Update ${name.fUC()}
${name}Router.put(
'/${name}/:${name}Id',
${name}Validation.update${name.fUC()},
${name}Controller.update${name.fUC()},
);
// Delete ${name.fUC()}
${name}Router.delete(
'/${name}/:${name}Id',
${name}Validation.delete${name.fUC()},
${name}Controller.destroy${name.fUC()},
);

export default ${name}Router;`;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Route");
    const make = "route";
    tools.run({ ilog, env, data, services, storeg, spinner, node, make, init });
  },
};
