import { useState } from 'react'
import Question from './Question'
import Confetti from 'react-confetti'
import Result from './Result'

const Quiz = ({ categoryName, questionData, playAgain}) => {
  const [currentQ, setCurrentQ] = useState(0)
  const [currentResponse, setCurrentResponse] = useState(null)
  const [score, setScore] = useState(0)

  if (questionData && currentQ === questionData.length - 1) {
    return (
      <div
        className="endgame"
        style={{ display: 'grid', 'place-content': 'center', height: '100vh' }}
      >
        <Confetti />
        <h1>No more Qs!</h1>
        <p>You got {score} out of {questionData.length} questions right.</p>
        <div>
          <button className="waves-effect waves-teal btn-flat" onClick={playAgain}>Play again</button>
        </div>
      </div>
    )
  }
  const handleAnswer = (answer) => {
    if (answer) {
      setScore(score + 1)

    }
    setCurrentResponse(answer)
  }

  const handleNext = () => {
    setCurrentResponse(null)
    setCurrentQ(currentQ + 1)
  }

  return (
    <div className="container">
      <h2>{categoryName}</h2>
      {questionData && (
        <Question
          question={questionData[currentQ].question}
          answerChoices={questionData[currentQ].answerChoices}
          correctAnswer={questionData[currentQ].correctAnswer}
          handleAnswer={handleAnswer}
        />
      )}
      {currentResponse !== null && <Result outcome={currentResponse} />}
      <button
        className="next waves-effect waves-light btn-large"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  )
}

export default Quiz
