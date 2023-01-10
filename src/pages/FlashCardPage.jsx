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
  const [showTitle, setShowTitle] = useState(false);

  function handleButtonClick() {
    const shuffedCards = shuffleArray(allCards);

    setAllCards(shuffedCards);
  }

  function handleRadioShowDescription() {
    setShowTitle(false);
  }

  function handleRadioShowTitle() {
    setShowTitle(true);
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
          {allCards.map(({id, title, description}) => {
            return(
              <FlashCard 
                key={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}