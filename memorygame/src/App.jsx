/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [cards, setCards] = useState(generateGridId());
  const [isLock, setLock] = useState(false);
  const [flipCard, setFlipCard] = useState([]);
  const handleClick = (index) => {
    if (cards[index].isFlagged || isLock) {
      return;
    }
    const copyCards = [...cards];
    copyCards[index].isFlagged = true;
    setCards(copyCards);
    setFlipCard([...flipCard, index]);
  };
  useEffect(() => {
    if (flipCard.length === 2) {
      setLock(true);
      setTimeout(() => {
        if (cards[flipCard[0]].number !== cards[flipCard[1]].number) {
          setCards((prevCard) => {
            const copyCard = [...prevCard];
            copyCard[flipCard[0]].isFlagged = false;
            copyCard[flipCard[1]].isFlagged = false;
            return copyCard;
          });
        }
        setLock(false);
        setFlipCard([]);
      }, 2000);
    }
  }, [flipCard]);
  return (
    <div>
      <h1>Welcome to memory game</h1>
      <div className="grid-container">
        {/* {genrateGridId()} */}
        {cards.map(({ id, number, isFlagged }) => {
          return (
            <button className="cards" key={id} onClick={() => handleClick(id)}>
              {isFlagged ? number : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function generateGridId() {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlagged: false };
  });
  //console.log(grid);
  // console.log(cards);
  return cards;
}
