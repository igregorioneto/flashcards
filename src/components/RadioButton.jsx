import { getNewId } from "../services/idService";

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  children: buttonDescription = 'Descrição do botão',
  buttonChecked = false,
  onButtonClick = null,
}) {

  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  
  return(
    <div 
      className="flex flex-row items-center space-x-2"
    >
      <input 
        type="radio"
        name={name}
        id={id}
        checked={buttonChecked}
        onChange={handleButtonClick}
      />
      <label htmlFor={id}>
        { buttonDescription }
      </label>
    </div>
  );
}