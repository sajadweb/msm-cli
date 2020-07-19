const init = (name) => {
  return `import React from 'react';

const ${name.fUC()}Context = React.createContext({});
export const ${name.fUC()}Provider = ${name.fUC()}Context.Provider;
export default ${name.fUC()}Context;
  `;
};

module.exports = {
  init,
};
