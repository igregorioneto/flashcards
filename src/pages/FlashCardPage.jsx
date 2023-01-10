import { useState } from "react";
import { allFlashCards } from "../data/allFlashCards";
import { shuffleArray } from "../helpers/arrayHelpers";
import Header from "../components/Header";
import Main from "../components/Main";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import FlashCards from "../components/FlashCards";
import FlashCard from "../components/FlashCard";

export default function FlashCardPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showTitle, setShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffedCards = shuffleArray(allCards);

    setAllCards(shuffedCards);
  }

  function handleRadioShowDescription() {
    const updated = [...allCards]
      .map(card => ({...card, showTitle: false}));

    setAllCards(updated);
    setShowTitle(false);
  }

  function handleRadioShowTitle() {
    const updated = [...allCards]
      .map(card => ({...card, showTitle: true}));

    setAllCards(updated);
    setShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updated = [...allCards];
    const cardIndex = updated.findIndex(card => card.id === cardId);
    updated[cardIndex].showTitle = !updated[cardIndex].showTitle;

    setAllCards(updated);
  }

  return(
    <>
      <Header>Flashcards</Header>
      <Main>
        <div className="text-center mb-4">
          <Button
            onButtonClick={handleButtonClick}
          >
            Embaralhar cards
          </Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={showTitle}
            onButtonClick={handleRadioShowTitle}
          >
            Mostrar título
          </RadioButton>

          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={!showTitle}
            onButtonClick={handleRadioShowDescription}
          >
            Mostrar descrição
          </RadioButton>
        </div>

        <FlashCards>
          {allCards.map(({id, title, description, showTitle}) => {
            return(
              <FlashCard 
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}