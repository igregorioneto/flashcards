import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Error from "./Error";
import Button from "./Button";

export default function Form({
  title: formTitle = 'Título do formulário',
  isCreate = true,
  children: flashCard = null,
  onFormSubmit = null
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  function cleanInputs() {
    setTitle('');
    setDescription('');
  }

  useEffect(() => {
    if (isCreate) {
      cleanInputs();
    }
  }, [isCreate]);

  function handleChangeTitle(newTitle) {
    setTitle(newTitle);
  }

  function handleChangeDescription(newDescription) {
    setTitle(newDescription);
  }

  function handleFormReset() {
    cleanInputs();
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if(validateForm()) {
      setError('');

      if(onFormSubmit) {
        onFormSubmit({ title, description});
        handleFormReset();
      }
    } else {
      setError('Todos os campos devem ser preenchidos!');
    }
  }

  const formBackground = isCreate ? 'bg-green-50' : 'bg-yellow-50';

  return(
    <form
      className={`p-4 ${formBackground}`}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <h2 className="font-semibold flex flex-row justify-center text-xl">
        {formTitle}
      </h2>

      <TextInput 
        labelDescription="Título do flash card:"
        inputValue={title}
        onInputChange={handleChangeTitle}
        autoFocus
      />

      <TextArea 
        labelDescription="Descrição do flash card:"
        textAreaValue={description}
        onTextAreaChange={handleChangeDescription}
      />

      <div className="flex flex-row items-center justify-between">
        <Error>{error}</Error>

        <div>
          <Button
            colorClass="bg-red-200"
            type="reset"
          >
            Limpar
          </Button>

          <Button
            colorClass="bg-green-200"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}