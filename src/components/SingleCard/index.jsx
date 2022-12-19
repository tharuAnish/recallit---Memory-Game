import "./singlecard.style.css"

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : " "}>
        <img src={card.src} className="cardFront" alt="image" />
        <img
          src="./img/cover.webp"
          onClick={handleClick}
          className="cardBack"
          alt="cover image"
        />
      </div>
    </div>
  )
}
