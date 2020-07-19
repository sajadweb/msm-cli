const command = require("../commands/repository");
const useContext = ({ SERVICE_DIR, service, name, repository }) => {
  let repo = service;
  if (repository) {
    repo = repository.fUC();
  }
  return `<?php
namespace ${SERVICE_DIR.fUC()}\\${service}\\Controllers;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use Services\\${service}\\Repositories\\I${repo}Repository;

/**
 * ${name}
 * @author Sajadweb
 * ${Date()}
 */
class ${name}Controller extends Controller{

    private $repository;
    public function __construct(I${repo}Repository $repository){
        // todo add repo
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            return Ok($this->repository->all());
        } catch (\\Exception $exp) {
            InternalServerError500();
        }
    }

    public function store(Request $request)
    {
        try {
            return Ok($this->repository->store($request->all()));
        } catch (\\Exception $exp) {
            InternalServerError500();
        }
    }

    public function  show($uuid)
    {
        try {
            return Ok($this->repository->show($uuid));
        } catch (\\Exception $exp) {
            InternalServerError500();
        }
    }

    public function update($uuid,Request $request)
    {
        try {
            return Ok($this->repository->update($uuid,$request->all()));
        } catch (\\Exception $exp) {
            InternalServerError500();
        }
    }

    public function destroy($uuid)
    {
        try {
           return Ok($this->repository->destroy($uuid));
        } catch (\\Exception $exp) {
            InternalServerError500();
        }
    }
}
`;
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
  let repository=null;
  console.log('command',command)
  if (!full) {
      repository = await command.run({
      ilog,
      env,
      spinner,
      SERVICE_DIR,
      data,
      services,
      storeg,
      service: micro,
    },node);
  }

  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Controllers`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Controllers/${name}Controller.php`,
    useContext({ SERVICE_DIR, service: micro, name, repository }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
