import { getNewId } from "../services/idService";

export default function TextInput({
  labelDescription = 'Descrição do label:',
  inputValue = 'Valor padrão do input',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {

  function handleInputChange({ currentTarget }) {
    if(onInputChange) {
      const value = currentTarget.value;
      onInputChange(value);
    }
  }

  return(
    <div className="flex flex-col my-4">
      <label htmlFor={id} className="text-sm mb-1">
        {labelDescription}
      </label>

      <input 
        type="text"
        className="border p-1"
        value={inputValue} 
        id={id}
        autoFocus={autoFocus}
        onChange={handleInputChange}
      />
    </div>
  );
  
}