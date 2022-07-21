import he from 'he'

const Question = ({
  question,
  answerChoices,
  correctAnswer,
  handleCorrect,
}) => {
  const selectAnswer = (e) => {
    if (e.target.innerText === correctAnswer) {
      handleCorrect()
    }
  }

  return (
    <div className="question card">
      <p>{question}</p>
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
  )
}

export default Question
