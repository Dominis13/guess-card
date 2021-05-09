import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import config from '../appConfig';
import getRandomDeck from '../utils/getRandomDeck';
import Card from './Card';
import Timer from './Timer';

const GameStyled = styled.div`
  & h1 {
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  
  & button {
    margin: 0 15px;
  }
`;

const Clicks = styled.div`
  font-size: 32px;
  margin-left: 30px;
  color: ${(props) => props.isWon ? 'green' : 'black'}; 
`;

const DeckStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 1350px;
  margin: 0 auto;
`;

export default (props) => {
  const deckArr = getRandomDeck(config.pairs).map((card, index) => {
    return {
      ...card,
      isGuessed: false,
      isFrontSide: false,
      index,
    }
  });
  // keeps deck with cards config. Everything related with cards status based on this object
  const [deck, setDeck] = useState(deckArr);

  // keep two open cards or null. Used to understand what user is doing
  const [openCards, setOpenCards] = useState([null, null]);

  // keep game start Date object
  const [gameStart, setGameStart] = useState(null);

  const [clicks, setClicks] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const clickHandler = (event, card) => {
    // do nothing if won, if 2 cards are open or if open card is clicked
    if (isWon || openCards[1] || !card.isFrontSide) return;

    if (clicks === 0) {
      setGameStart(new Date());
    }

    const updatedDeck = Array.from(deck);
    // flipping the card
    updatedDeck[card.index].isFrontSide = !card.isFrontSide;
    setDeck(updatedDeck);

    let openingCardIndex = openCards[0] ? 1 : 0;
    const updatedOpenCards = Array.from(openCards);
    updatedOpenCards[openingCardIndex] = card;
    setOpenCards(updatedOpenCards);

    setClicks(clicks + 1);
  }

  let timeoutFlip;
  useEffect(() => {
    timeoutFlip = setTimeout(() => {
      if (!openCards[0]) return;
      const card1 = openCards[0];
      const card2 = openCards[1];
      const updatedDeck = Array.from(deck);

      if (card1.id === card2.id) {
        updatedDeck[card1.index].isGuessed = true;
        updatedDeck[card2.index].isGuessed = true;
        const isWon = updatedDeck.every((card) => card.isGuessed);
        setIsWon(isWon);
      } else {
        updatedDeck[card1.index].isFrontSide = true;
        updatedDeck[card2.index].isFrontSide = true;
      }

      setDeck(updatedDeck)
      setOpenCards([null, null]);
    }, config.cardActionDelay || 1500);
    return () => {clearTimeout(timeoutFlip)}
  }, [openCards[1]]);

  const [start, setStart] = useState(false);
  const startGame = () => {
    if (!start) {
      setStart(true);
      const updatedDeck = Array.from(deck).map((card) => ({...card, isFrontSide: true}));
      setDeck(updatedDeck);
    }
  }

  return (
    <GameStyled>
      <h1>Welcome to the card guessing game!</h1>
      <Header>
        <button onClick={startGame} disabled={start}>Start</button>
        <Timer start={gameStart} isWon={isWon}/>
        <Clicks isWon={isWon}>Clicks: {clicks}</Clicks>
        <button onClick={props.reset}>Reset</button>
      </Header>

      <DeckStyled>
        {deck.map((cardProps, index) => {
          return (
            <Card
              {...cardProps}
              isWon={isWon}
              frontSide={config.frontSide}
              onClick={clickHandler}
              key={index}
            />)
        })}
      </DeckStyled>
    </GameStyled>
  );
}
