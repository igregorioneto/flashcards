import { useEffect, useState } from "react";

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
      
    </form>
  );
}