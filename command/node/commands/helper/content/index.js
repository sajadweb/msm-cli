const useContext = ({ SERVICE_DIR, service, name }) => {
    return `export const ${name.toLowerCase()} = () => {};`;
  };
  const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/helper`);
    await storeg.write(
      `${SERVICE_DIR}/${micro}/helper/${name}.helper.js`,
      useContext({ SERVICE_DIR, service: micro, name }),
      true
    );
  };
  module.exports = {
    useContext,
    setContext,
  };