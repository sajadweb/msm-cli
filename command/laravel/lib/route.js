const useContext = ({ content, SERVICE_DIR, service, name }) => {
  if(content){
    return content.replace('//sw:comment:readonly',`//sw:comment:readonly
  #region ${service.toLowerCase()}/${name.toLowerCase()}
  Route::group(['prefix' => '${service.toLowerCase()}/${name.toLowerCase()}'], function () {
      Route::get('/', '${name}Controller@index');
      Route::post('/', '${name}Controller@store');
      Route::get('/{uuid}', '${name}Controller@show');
      Route::put('/{uuid}', '${name}Controller@update');
      Route::delete('/{uuid}', '${name}Controller@destroy');
  });
  #endregion`)
  }
    return `<?php
use Illuminate\\Support\\Facades\\Route;

Route::group(['prefix' => 'v1'], function(){
  //sw:comment:readonly
  #region ${name.toLowerCase()}
  Route::group(['prefix' => '${name.toLowerCase()}'], function () {
      Route::get('/', '${name}Controller@index');
      Route::post('/', '${name}Controller@store');
      Route::get('/{uuid}', '${name}Controller@show');
      Route::put('/{uuid}', '${name}Controller@update');
      Route::delete('/{uuid}', '${name}Controller@destroy');
  });
  #endregion
});`;
  };
  const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Routes`);
    const fileRoute= `${SERVICE_DIR}/${micro}/Routes/api.php`;
    if(storeg.directoryExists(fileRoute)){
      let file=await storeg.readSync(fileRoute);
      await storeg.write(
        fileRoute,
        useContext({content:file.toString(),SERVICE_DIR, service: micro, name }),
        true
      );
    }else{
      await storeg.write(
        fileRoute,
        useContext({ SERVICE_DIR, service: micro, name }),
        true
      );
    }
  };
  module.exports = {
    useContext,
    setContext,
  };