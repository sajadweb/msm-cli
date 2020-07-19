const tools = require("./tools");
const init = (name) => {
  return `import mongoose, { Schema } from 'mongoose';
const ${name}Schema = new Schema({
  deletedAt:{  date: {type:Date} , actor:{ type: Schema.Types.ObjectId , ref:'contact'}   },
  createdAt: { type: Date , default: Date.now() },
  updatedAt: { type: Date },
});

const ${name}Model = mongoose.model('${name.c2snake()}', ${name}Schema);
export default ${name}Model;
    `;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Model");
    const make = "model";
    tools.run({ ilog, env, data, services, storeg, spinner, node, make, init });
  },
};
