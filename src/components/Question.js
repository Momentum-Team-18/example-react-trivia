import he from 'he'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
            )) || (
              <Skeleton count={4} className="collection-item" width={'80%'} />
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Question
