const useContext = ({ SERVICE_DIR, service, name }) => {
  return `import * as ${name.fUC()}Model from '../model/${name}.model';

const ${name.fUC()}Repository = new (class ${name.fUC()}Repository {
  constructor() {
    this.model = ${name.fUC()}Model;
  }
  async index() {
    try {
      return this.model.find({});
    } catch (e) {}
  }

  async show(id) {
    try {
      return this.model.findOne({ _id: id });
    } catch (e) {}
  }

  async insert(data) {
    try {
      return this.model.create(data);
    } catch (e) {}
  }

  async update(find, update) {
    try {
      return this.model.find(find, update);
    } catch (e) {}
  }

  async destroy(find) {
    try {
      return this.model.findOneAndUpdate(find, {
        deletedAt: { date: Date.now() },
      });
    } catch (e) {}
  }
})();

export default ${name.fUC()}Repository;
`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/repository`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/repository/${name}.repository.js`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
