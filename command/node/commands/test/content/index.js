const useContext = ({ SERVICE_DIR, service, name }) => {
  return `export const ${name.toLowerCase()}= () => {}`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/tests`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/tests/${name}.test.js`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
