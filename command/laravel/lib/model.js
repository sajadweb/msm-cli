const useContext = ({ SERVICE_DIR, service, name }) => {
  return `<?php

namespace ${SERVICE_DIR.fUC()}\\${service}\\Models;

use App\\Concern\\Latest;
use App\\Concern\\Me;
use App\\Concern\\UUID;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

/**
 * ${name}
 * @author Sajadweb
 * ${Date()}
 */
class ${name} extends Model
{
    use UUID, SoftDeletes, Me, Latest;

    protected $guarded = ['id'];
}`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Models`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Models/${name}.php`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
