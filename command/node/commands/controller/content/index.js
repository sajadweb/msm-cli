const useContext = ({ SERVICE_DIR, service, name }) => {
  return `
const  ${name.fUC()}Ctrl = new (class ${name.fUC()}Controller {
async get${name.fUC()}(req, res) {
    try {
    } catch (e) {}
}

async show${name.fUC()}(req, res) {
    try {
    } catch (e) {}
}

async insert${name.fUC()}(req, res) {
    try {
    } catch (e) {}
}

async update${name.fUC()}(req, res) {
    try {
    } catch (e) {}
}

async destroy${name.fUC()}(req, res) {
    try {
    } catch (e) {}
}
})();

export default ${name.fUC()}Ctrl;
`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/controller`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/controller/${name}.controller.js`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
