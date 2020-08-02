const init = (name) => {
  return `---
name: ${name.fUC()}
---

import { Playground, Props } from 'docz';
import ${name.fUC()}  from './';

# ${name.fUC()}
Display the ${name.fUC()} of an operation flow.

## Properties
<Props of={${name.fUC()}} />

## Basic usage

<Playground>
    <${name.fUC()} />
</Playground>


## Examples
\`\`\`js
<${name.fUC()} />
\`\`\`
`;
};

module.exports = {
  init,
};
