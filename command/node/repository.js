const tools = require("./tools");
const init = (name) => {
  return `
import * as ${name.fUC()}Model from '../model/${name}.model';


const  ${name.fUC()}Repository = new (class ${name.fUC()}Repository {
constructor() {
  this.${name.fUC()}Model = ${name.fUC()}Model;
}
async index() {
    try {
      return this.${name.fUC()}Model.find({});
    } catch (e) {}
}

async show(id) {
    try {
      return this.${name.fUC()}Model.findOne({_id:id});
    } catch (e) {}
}

async insert(data) {
    try {
      return this.${name.fUC()}Model.create(data);
    } catch (e) {}
}

async update(find, update) {
    try {
      return this.${name.fUC()}Model.find(find , update);
    } catch (e) {}
}

async destroy(find) {
    try {
      return this.${name.fUC()}Model.findOneAndUpdate(find, {
        deletedAt: { date: Date.now() },
      })
    } catch (e) {}
}
})();

export default ${name.fUC()}Repository;
`;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Repository");
    const make = "repository";
    tools.run({ ilog, env, data, services, storeg, spinner, node, make, init });
  },
};
