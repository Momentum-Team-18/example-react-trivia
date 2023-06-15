import he from 'he'

const Question = ({
  question,
  answerChoices,
  correctAnswer,
  handleAnswer,
  answered,
}) => {
  const selectAnswer = (e) => {
    if (answered) return
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
