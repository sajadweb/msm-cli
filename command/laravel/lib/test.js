const useContext = ({ SERVICE_DIR, service, name }) => {
    return `<?php
  
namespace ${SERVICE_DIR.fUC()}\\${service}\Tests;

use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Tests\\CreatesApplication;
use Tests\\TestCase;

class ${name}FTests extends TestCase
{
    use RefreshDatabase, CreatesApplication;
    private $uri = '/api/v1/${name.toLowerCase()}';
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     *
     * @group ${service}
     * @return void
     */
    public function testGetSuccessTest(): void
    {
      $response = $this->json('GET', $this->uri);
      $response->assertStatus(200);
    }
    /**
     *
     * @group ${service}
     * @return void
     */
    public function testPostSuccessTest(): void
    {
      $response = $this->json('POST', $this->uri);
      $response->assertStatus(200);
    }

}
  `;
  };
  const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Tests`);
    await storeg.write(
      `${SERVICE_DIR}/${micro}/Tests/${name}FTests.php`,
      useContext({ SERVICE_DIR, service: micro, name }),
      true
    );
  };
  module.exports = {
    useContext,
    setContext,
  };
  