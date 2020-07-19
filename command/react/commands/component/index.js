const { trim } = require("lodash");
const fun = require("./component/fun");
const less = require("./component/less");
const mdx = require("./component/mdx");
const provider = require("./component/provider");

const init = async ({ ilog, env, data, services, storeg, spinner }, node) => {
  let micro = await services.input({
    name: "component",
    message: "Enter the component name in lowercase (select):",
    validate: function (value) {
      if (trim(value).length > 0) {
        return true;
      } else {
        return "Enter the component name in lowercase!";
      }
    },
  });
  let cmd = await services.input({
    name: "name",
    message: "Enter the component name in lowercase (select)+Ui:",
    validate: function (value) {
      if (trim(value).length > 0) {
        return true;
      } else {
        return "Enter the component name in lowercase!";
      }
    },
  });
  const component = micro.component.toLowerCase();
  const dir = `./src/${env.REACT_DIR}`;
  storeg.directoryUpdateOrNew(`${dir}/${component}`);

  spinner.load();

  // ui
  storeg.directoryUpdateOrNew(`${dir}/${component}/components`);
  await storeg.write(
    `${dir}/${component}/components/${cmd.name}Ui.js`,
    fun.initui(cmd.name,`${cmd.name}Ui.style`)
  );
  // less
  await storeg.write(
    `${dir}/${component}/components/${cmd.name}Ui.style.less`,
    less.init(cmd.name)
  );
  spinner.finish();
};

module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Full Component");
    await init({ ilog, env, data, services, storeg, spinner }, node);
  },
};
