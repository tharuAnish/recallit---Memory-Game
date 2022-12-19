import { useEffect, useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import SingleCard from "./components/SingleCard"

const cardImages = [
  //Array of cards
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // choice 1 src match choice 2 srcwe have a match
        setCards((prevCards) => {
          return prevCards.map((card) => {
            // returning new array of card
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurn) => prevTurn + 1)
  }

  return (
    <div className="App">
      <Navbar />
      <div className="buttonBox">
        <button className="newButton" onClick={shuffleCards}>
          New Game
        </button>
        <p className="moves">Moves : {turns}</p>
      </div>

      <div className="cardGrid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            /* flip thecard if these conditions match */
          />
        ))}
      </div>
    </div>
  )
}
export default App
