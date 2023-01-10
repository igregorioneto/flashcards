import { deleteData, getAllData, postData, updateData } from "./httpService";

export async function apiGetAllFlashCards() {
  const allFlashCards = await getAllData('/flashcards');
  return [...allFlashCards];
}

export async function apiCreateFlashCard(object) {
  const newFlashCard = await postData('/flashcard', object);
  return newFlashCard;
}

export async function apiUpdateFlashCard({
  id,
  title,
  description
}) {
  const updatedFlashCard = await updateData(`/flashcard/${id}`, {
    title,
    description
  });
  return updatedFlashCard;
}

export async function apiDeleteFlashCard(id) {
  await deleteData(`/flashcard/${id}`);
}