import { useState } from 'react'
import Question from './Question'
import Result from './Result'
import Endgame from './Endgame'

const Quiz = ({ categoryName, questionData, playAgain }) => {
  const [currentQ, setCurrentQ] = useState(0)
  const [currentQAnswered, setCurrentQAnswered] = useState(false)
  const [currentResponse, setCurrentResponse] = useState(null)
  const [score, setScore] = useState(0)

  if (questionData && currentQ === questionData.length - 1) {
    return (
      <Endgame
        score={score}
        numberOfQuestions={questionData.length}
        playAgain={playAgain}
      />
    )
  }

  const handleAnswer = (answer) => {
    if (answer) {
      setScore(score + 1)
    }
    setCurrentResponse(answer)
    setCurrentQAnswered(true)
  }

  const handleNext = () => {
    setCurrentResponse(null)
    setCurrentQ(currentQ + 1)
    setCurrentQAnswered(false)
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
          answered={currentQAnswered}
        />
      )}
      {currentResponse !== null && <Result outcome={currentResponse} />}
      <button
        className="next waves-effect waves-light btn-large"
        onClick={handleNext}
        disabled={!currentQAnswered}
      >
        Next
      </button>
    </div>
  )
}

export default Quiz
