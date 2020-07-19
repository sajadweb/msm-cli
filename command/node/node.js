const { trim, get } = require("lodash");
const Types = require("./enum/index");
const rest = require("./rest");
const model = require("./model");
const repository = require("./repository");
const helper = require("./helper");
const request = require("./request");
const route = require("./route");
const controler = require("./controler");

// // command-line user interaction
const init = async ({ilog, env, data, services, storeg, spinner }) => {
  storeg.directoryUpdateOrNew(`./${env.NODE_DIR}`);
  const choices = [
    {
      name: "micro",
      type: "list",
      choices: [Types.RF, Types.CTR, Types.MD, Types.REP, Types.RQ, Types.R,Types.H],
      default: Types.RF,
      message: "Choice your Node service from list:",
      validate: function (value) {
        if (trim(value).length > 1) {
          // TODO check has micro
          return true;
        } else {
          return "Choice your Node service from list.";
        }
      },
    },
  ];
  const answer = await services.prompt(choices);
  switch (get(answer, "micro")) {
    case Types.RF:
      return rest.run({ilog, env, data, services, storeg, spinner},init);
    case Types.CTR:
      return controler.run({ilog, env, data, services, storeg, spinner},init);
    case Types.MD:
      return model.run({ilog, env, data, services, storeg, spinner},init);
    case Types.REP:
      return repository.run({ilog, env, data, services, storeg, spinner},init);
    case Types.RQ:
      return request.run({ilog, env, data, services, storeg, spinner},init);
    case Types.R:
      return route.run({ilog, env, data, services, storeg, spinner},init);
    case Types.H:
      return helper.run({ilog, env, data, services, storeg, spinner},init);
  }
};
module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }) => {
    ilog("Init Node^");
    init({ ilog, env, data, services, storeg, spinner });
  },
};

// const inquirer = require("inquirer");
// const { trim, find, get } = require("lodash");
// const storeg = require("../../lib/storeg");
// const spinner = require("../../lib/spinner");
// const services = require("../../lib/services");
// const env = require("../../lib/config");
// const initNode = () => {
//   const questions = [
//     {
//       name: "service",
//       type: "input",
//       message: "Enter your Node Micro service:",
//       validate: function (value) {
//         if (trim(value).length > 1) {
//           // TODO check has micro
//           return true;
//         } else {
//           return "Enter your Node Micro service.";
//         }
//       },
//     },
//   ];
//   return inquirer.prompt(questions);
// };
// const fullDir = async (service) => {
//   spinner.load();
//   await storeg.directoryUpdateOrNew(`${env.serv}/${service}/controller`);
//   await storeg.directoryUpdateOrNew(`${env.serv}/${service}/helper`);
//   await storeg.directoryUpdateOrNew(`${env.serv}/${service}/repository`);
//   await storeg.directoryUpdateOrNew(`${env.serv}/${service}/request`);
//   await storeg.directoryUpdateOrNew(`${env.serv}/${service}/route`);
//   spinner.finish();
// };
// module.exports = {
//   run: async ({data}) => {
//     // console.log(data)
//     storeg.directoryUpdateOrNew("services");
//     const init = await initNode();
//     const dir = init.service.toLowerCase();
//     storeg.directoryUpdateOrNew(`${env.serv}/${dir}`);
//     const service = find(get(data, "services"), (item) => item.name === dir);
//     if (service) {
//       console.log("exsit", init);
//     } else {
//       await fullDir(dir);
//       data.services.push({
//         name: dir,
//         controller: [`${dir}.controller.js`],
//         helper: [`${dir}.helper.js`],
//         repository: [`${dir}.repository.js`],
//         request: [`${dir}.request.js`],
//         route: [`${dir}.route.js`],
//       });
//       storeg.writeJson(`./${env.config}/config.json`,data);
//     }
//   },
// };
