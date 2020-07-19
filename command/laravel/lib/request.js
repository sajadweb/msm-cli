const useContext = ({ SERVICE_DIR, service, name }) => {
    return `<?php
  

namespace ${SERVICE_DIR.fUC()}\\${service}\\Requests;

use Illuminate\\Contracts\\Validation\\Validator;
use Illuminate\\Foundation\\Http\\FormRequest;
use Illuminate\\Http\\Exceptions\\HttpResponseException;
use Illuminate\\Validation\\Factory as ValidationFactory;
use Illuminate\\Validation\\Rule;
use Services\\Ticket\\Enum\\AttachmentType;


class ${name}Requests extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       // TODO ADD NEW RULE
        return [
            'name' => 'required|max:194',
            'phone' => 'required|max:50',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(BadRequest400());
    }
} `;
  };
  const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/Requests`);
    await storeg.write(
      `${SERVICE_DIR}/${micro}/Requests/${name}Request.php`,
      useContext({ SERVICE_DIR, service: micro, name }),
      true
    );
 
  };
  module.exports = {
    useContext,
    setContext,
  };
  