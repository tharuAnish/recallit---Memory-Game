import { useState } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import SingleCard from "./components/SingleCard"

const cardImages = [
  //Array of cards
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null) //Two state for matching card
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
    // taking card as an argument
    console.log(card) // with this we get whichever the card we clicked
    choiceOne ? setChoiceTwo(card) : setChoiceTwo(card) // to know which choice one or two
  }

  return (
    <div className="App">
      <Navbar />
      <div className="buttonBox">
        <button className="newButton" onClick={shuffleCards}>
          New Game
        </button>
        <p className="moves">Moves :</p>
      </div>

      <div className="cardGrid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  )
}
export default App
