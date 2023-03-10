import { useEffect, useState } from "react";
import { shuffleArray } from "../helpers/arrayHelpers";
import Header from "../components/Header";
import Main from "../components/Main";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import FlashCards from "../components/FlashCards";
import FlashCard from "../components/FlashCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { GrAdd as NewIcon } from 'react-icons/gr';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {
  apiGetAllFlashCards,
  apiCreateFlashCard,
  apiUpdateFlashCard,
  apiDeleteFlashCard,
} from '../services/flashcardService';

import FlashCardItem from "../components/FlashCardItem";
import Form from "../components/Form";

export default function FlashCardPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [error, setError] = useState('');
  const [studyShowTitle, setStudyShowTitle] = useState(true);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [createMode, setCreateMode] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  useEffect(() => {
    async function getAllFlashCards() {
      try {
        const cards = await apiGetAllFlashCards();
        setAllCards(cards);

        setTimeout(() => {
          setError('');
          setLoadingCards(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllFlashCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({...card, showTitle: true})));
  }, [allCards]);

  function handleButtonClick() {
    const shuffedCards = shuffleArray(studyCards);

    setStudyCards(shuffedCards);
  }

  function _toggleShowTitleOrDescription(showTitle) {
    const updated = [...allCards]
      .map(card => ({...card, showTitle}));

    setAllCards(updated);
    setStudyShowTitle(showTitle);
  }

  function handleRadioShowDescription() {
    const updated = [...studyCards]
      .map(card => ({...card, showTitle: false}));

    setStudyCards(updated);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitle() {
    const updated = [...studyCards]
      .map(card => ({...card, showTitle: true}));

    setStudyCards(updated);
    setRadioButtonShowTitle(true);
  }

  function handleStudyShowDescription() {
    _toggleShowTitleOrDescription(false);
  }

  function handleStudyShowTitle() {
    _toggleShowTitleOrDescription(true);
  }

  function handleToggleFlashCard(cardId) {
    const updated = [...studyCards];
    const cardIndex = updated.findIndex(card => card.id === cardId);
    updated[cardIndex].showTitle = !updated[cardIndex].showTitle;

    setStudyCards(updated);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleEditFlashCard(flashCard) {
    setCreateMode(false);
    setCurrentTab(1);
    setSelectedFlashCard(flashCard);
  }

  function handleChangeTab(selectedTab) {
    setCurrentTab(selectedTab);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      await apiDeleteFlashCard(cardId);

      setError('');
      setAllCards(allCards.filter(card => card.id !== cardId));
    } catch (error) {
      setError(error.message);
    }
  }

  async function createNewFlashCard({ title, description }) {
    try {
      const newCard = await apiCreateFlashCard({
        title,
        description,
      });

      setAllCards(current => [...current, {...newCard}]);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  async function updateFlashCard({ title, description }) {
    try {
      await apiUpdateFlashCard({
        id: selectedFlashCard.id,
        title,
        description,
      });

      setAllCards(
        allCards.map(card => {
          if(card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }
          return card;
        })
      );
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  async function handlePersistFlashCard(title, description) {
    if (createMode) {
      try {
        const newCard = await apiCreateFlashCard(title, description);
        setAllCards([...allCards, newCard]);
        setError('');
      } catch (error) {
        setError(error.message);
      }
      
    } else {
      try {
        await apiUpdateFlashCard(selectedFlashCard.id,title, description);
        setAllCards(
          allCards.map(card => {
            if(card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex flex-row justify-center mt-8">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>
  }

  if (!loadingCards && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={currentTab} onSelect={handleChangeTab}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            <h2 className="font-semibold text-center mb-4 text-xl">
              {allCards.length} flash card(s) cadastrado(s).
            </h2>

            {allCards.map(card => {
              return(
                <FlashCardItem
                  key={card.id}
                  onEdit={handleEditFlashCard}
                  onDelete={handleDeleteFlashCard}
                >
                  {card}
                </FlashCardItem>
              )
            })}
          </TabPanel>

          <TabPanel>
            <Button
              colorClass="bg-green-100"
              extraClasses="font-semibold mb-4"
              onButtonClick={handleNewFlashCard}
            >
              <div className="flex flex-row items-center justify-start space-x-2">
                <NewIcon size={24} /> <span>Novo flash card</span>
              </div>
            </Button>

            <Form
              title={`${createMode ? 'Cria????o' : 'Edi????o'} do Flash Card`}
              isCreate={createMode}
              onPersist={handlePersistFlashCard}
            >
              {selectedFlashCard}
            </Form>
          </TabPanel>

          <TabPanel>
            <div className="text-center mb-4" >
              <Button 
                onButtonClick={handleButtonClick} 
              >
                Embaralhar cards
              </Button>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4 m-4" >
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitle}
              >
                Mostrar t??tulo
              </RadioButton>

              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescription}
              >
                Mostrar descri????o
              </RadioButton>
            </div>

            <FlashCards>
              {studyCards.map(({id, title, description, showTitle}) => {
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return(
    <>
      <Header>Flashcards</Header>
      <Main>
        { mainJsx }
      </Main>
    </>
  );
}