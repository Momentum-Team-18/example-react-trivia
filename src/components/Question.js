import he from 'he'

const Question = ({ question, answerChoices, correctAnswer, handleAnswer }) => {
  const selectAnswer = (e) => {
    handleAnswer(e.target.innerText === correctAnswer)
  }

  return (
    <div className="question card">
      <div className="card-content">
        <div className="card-title">{question}</div>
        <div className="answers">
          <ul className="collection">
            {answerChoices.map((choice, idx) => (
              <li className="collection-item" onClick={selectAnswer} key={idx}>
                {he.decode(choice)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Question
