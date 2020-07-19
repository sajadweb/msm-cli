var fuzzy = require("fuzzy");
const { get } = require("lodash");

module.exports = {
  getService: async ({ env, services, storeg, SERVICE_DIR, data }) => {
    const serach_data = data.services.map((item) =>
      get(item, "name", "NoItem")
    );

    const questions = {
      name: "name",
      data: serach_data,
      message: "Choice or enter your Micro service from list:",
      error: "Enter your Micro service.",
    };
    const micro = await services.search(questions);
    //todo add in service
    const component = micro.name.fUC();
    var result = data.services.find((item=>item.name.fUC()===component))
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${component}`);
    if (!(result)) {
      data.services.push({ name: component });
      storeg.writeJson(env.config, data);
      return { name: component};
    }
    return result;
  },
};
