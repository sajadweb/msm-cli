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
  const component = micro.component.toLowerCase();
  const dir = `./src/${env.REACT_DIR}`;
  storeg.directoryUpdateOrNew(`${dir}/${component}`);

  spinner.load();
  // component
  await storeg.write(`${dir}/${component}/index.js`, fun.init(component));

  //docz
  await storeg.write(
    `${dir}/${component}/${component.fUC()}.mdx`,
    mdx.init(component)
  );
  // provider
  storeg.directoryUpdateOrNew(`${dir}/${component}/context`);
  await storeg.write(
    `${dir}/${component}/context/index.js`,
    provider.init(component)
  );

  // ui
  storeg.directoryUpdateOrNew(`${dir}/${component}/components`);
  await storeg.write(
    `${dir}/${component}/components/${component}Ui.js`,
    fun.initui(component)
  );
  // less
  await storeg.write(
    `${dir}/${component}/components/style.less`,
    less.init(component)
  );
  spinner.finish();
};

module.exports = {
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Full Component");
    await init({ ilog, env, data, services, storeg, spinner }, node);
  },
};
