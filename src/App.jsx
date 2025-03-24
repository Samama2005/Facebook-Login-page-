import React, { useState, useEffect } from 'react';
import './App.css';

const cardImages = [
  { src: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png', matched: false }, // Helmet
  { src: 'https://cdn-icons-png.flaticon.com/512/854/854866.png', matched: false }, // Potion
  { src: 'https://cdn-icons-png.flaticon.com/512/497/497348.png', matched: false }, // Ring
  { src: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png', matched: false }, // Scroll
  { src: 'https://cdn-icons-png.flaticon.com/512/2886/2886009.png', matched: false }, // Shield
  { src: 'https://cdn-icons-png.flaticon.com/512/1828/1828981.png', matched: false }, // Sword
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle and initialize cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increment turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div>
        <img className="front" src={card.src} alt="card" />
        <img className="back" src="https://cdn-icons-png.flaticon.com/512/2179/2179279.png" alt="cover" />
      </div>
    </div>
  );
}

export default App;