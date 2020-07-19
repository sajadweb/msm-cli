const command = require("../commands/model");
const {appendContext} = require("./provider");
const useContext = ({ SERVICE_DIR, service, name, model }) => {
  model = model || service;
  return `<?php

namespace ${SERVICE_DIR.fUC()}\\${service}\\Repositories;

use Services\\${service}\\Models\\${model};

/**
 * ${name}
 * @author Sajadweb
 * ${Date()}
 */
class ${name}Repository implements I${name}Repository
{
      /**
     * The model being queried.
     *
     * @var ${name}
     */
    protected $model;
    public function __construct(${model} $model)
    {
        $this->model = $model::query();
    }

    public function all()
    {
        return $this->model->paginate();
    }

    public function store($data)
    {
        return $this->model->create($data);
    }

    public function show($uuid)
    {
        return $this->model->where('uuid',$uuid)->first();
    }

    public function update($uuid,$data)
    {
        return $this->model->where('uuid',$uuid)->update($data);
    }

    public function destroy($uuid)
    {
        return $this->model->where('uuid',$uuid)->destroy();
    }
}`;
};
const useContextI = ({ SERVICE_DIR, service, name, model }) => {
  return `<?php
namespace ${SERVICE_DIR.fUC()}\\${service}\\Repositories;

use ${SERVICE_DIR.fUC()}\\${service}\\Models\\${model || service};

/**
 * ${name}
 * @author Sajadweb
 * ${Date()}
 */
interface I${name}Repository 
{
    public function all();

    public function store($data);

    public function show($uuid);

    public function update($uuid,$data);

    public function destroy($uuid);
}`;
};
const setContext = async ({
  ilog,
  env,
  spinner,
  SERVICE_DIR,
  data,
  services,
  storeg,
  node,
  micro,
  name,
  full,
}) => {
  //TODO MODEL
  let model;
  if (!full) {
    model = await command.run(
      {
        ilog,
        env,
        spinner,
        SERVICE_DIR,
        data,
        services,
        storeg,
        service: micro,
      },
      node
    );
  }

  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Repositories`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Repositories/${name}Repository.php`,
    useContext({ SERVICE_DIR, service: micro, name, model }),
    true
  );
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Repositories/I${name}Repository.php`,
    useContextI({ SERVICE_DIR, service: micro, name, model }),
    true
  );
  if(!full){
   await appendContext.setRepository({SERVICE_DIR, storeg, micro:micro, name})
  }
};
module.exports = {
  useContext,
  useContextI,
  setContext,
};
