const useContext = ({ SERVICE_DIR, service, name }) => {
  return `<?php
// ${name} helper
function ${name}(){
  return "${name}";
}`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Helpers`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Helpers/${name}Helper.php`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
