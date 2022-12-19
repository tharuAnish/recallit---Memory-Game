import "./singlecard.style.css"

export default function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card) // for knowing which card is clicked
  }

  return (
    <div className="card">
      <img src={card.src} className="cardFront" alt="image" />
      <img
        src="./img/cover.webp"
        onClick={handleClick}
        className="cardBack"
        alt="cover image"
      />
    </div>
  )
}
