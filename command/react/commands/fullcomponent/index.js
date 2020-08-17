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

  storeg.directoryUpdateOrNew(`${dir}/${component.fUC()}`);

  spinner.load();
  // component
  await storeg.write(`${dir}/${component.fUC()}/index.js`, fun.init(component));

  //docz
  await storeg.write(
    `${dir}/${component.fUC()}/${component.fUC()}.md`,
    mdx.init(component)
  );
  // provider
  storeg.directoryUpdateOrNew(`${dir}/${component.fUC()}/context`);
  await storeg.write(
    `${dir}/${component.fUC()}/context/index.js`,
    provider.init(component)
  );

  // ui
  storeg.directoryUpdateOrNew(`${dir}/${component.fUC()}/components`);
  await storeg.write(
    `${dir}/${component.fUC()}/components/${component}Ui.js`,
    fun.initui(component)
  );
  // less
  await storeg.write(
    `${dir}/${component.fUC()}/components/style.less`,
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
