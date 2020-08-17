const init = (name) => {
  return `import React from 'react'
import PropTypes from 'prop-types'
import {${name.fUC()}Provider} from './context'
import ${name.fUC()}Ui from './components/${name.fUC()}Ui'

export default function ${name.fUC()}() {
  return (
    <${name.fUC()}Provider value={{name:"${name.fUC()}"}}>
        <${name.fUC()}Ui />
    </${name.fUC()}Provider>
  );
}

${name.fUC()}.propTypes = {

}`;
};
const initui = (name,ui) => {
  let style= 'style';
  if(ui){
    style= ui;
  }
  return `import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import ${name.fUC()}Context from './../context'
import './${style}.less';

export default function ${name.fUC()}Ui() {
  conat {name}= useContext(${name.fUC()}Context);
  return (
      <div className="${name}">
          {name}
      </div>

  );
}

${name.fUC()}Ui.propTypes = {

}`;
};

module.exports = {
  init,
  initui,
};
