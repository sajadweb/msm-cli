const init = (name) => {
  return `
Display the ${name.fUC()} of an operation flow.
## Basic usage
\`\`\`js 
 <${name.fUC()} />
\`\`\`
 `;
};

module.exports = {
  init,
};
