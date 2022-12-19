import { useEffect, useState } from "react"
import "./App.css"
import Footer from "./components/Footer"
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
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
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
        setTimeout(() => resetTurn(), 1000) //delayig in flipping 2nd card in mili sec
        // wait 1000 mili sec and fire that function
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurn) => prevTurn + 1)
    setDisabled(false)
  }

  // starting a new game automatically ,
  // fire a function whean a component forst load

  useEffect(() => {
    shuffleCards()
  }, [])

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
            disabled={disabled}
          />
        ))}
      </div>
      <Footer />
    </div>
  )
}
export default App
