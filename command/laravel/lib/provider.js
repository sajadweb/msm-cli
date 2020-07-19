const useContext = ({ SERVICE_DIR, service, name }) => {
  return `<?php

namespace ${SERVICE_DIR.fUC()}\\${service}\\Providers;

#region use
use Illuminate\\Support\\Facades\\Route;
use Illuminate\\Support\\ServiceProvider;
use Services\\${service}\\Repositories\\I${name}Repository;
use Services\\${service}\\Repositories\\${name}Repository;
#endregion

/**
 * ${name}
 * @author Sajadweb
 * ${Date()}
 */
class ${name} extends ServiceProvider
{
     /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        #region Helper
        require_once __DIR__ . "./../Helpers/${service}Helper.php";
        #endregion
        Route::middleware('api')
                ->prefix('api')
                ->namespace('${SERVICE_DIR.fUC()}\\${service}\\Controllers')
                ->group(base_path('${SERVICE_DIR}/${service}/Routes/api.php'));
        #region Repository
        $this->app->bind(I${service}Repository::class,${service}Repository::class);
        #endregion
    }
}`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Providers`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/Providers/${name}Provider.php`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
const appendContext = {
  setRepository: async ({ SERVICE_DIR, storeg, micro, name }) => {
    const service = micro;
    const fileRoute = `${SERVICE_DIR}/${micro}/Providers/${micro}Provider.php`;
    if (storeg.directoryExists(fileRoute)) {
      let file = await storeg.readSync(fileRoute);
      let text= file.toString();
      text=text.replace(
        "#region use",
        `#region use
use Services\\${service.fUC()}\\Repositories\\I${name.fUC()}Repository;
use Services\\${service.fUC()}\\Repositories\\${name.fUC()}Repository;`
      )
      await storeg.write(
        fileRoute,
        text.replace(
          "#region Repository",
          `#region Repository
        $this->app->bind(I${name.fUC()}Repository::class,${name.fUC()}Repository::class);`
        ),
        true
      );
    }
  },
};
module.exports = {
  useContext,
  setContext,
  appendContext,
};
