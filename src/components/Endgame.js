import Confetti from 'react-confetti'

const Endgame = ({ score, numberOfQuestions, playAgain }) => {
  return (
    <div className="endgame">
      <Confetti />
      <h1>No more Qs!</h1>
      <p>
        You got {score} out of {numberOfQuestions} questions right.
      </p>
      <div>
        <button
          className="waves-effect waves-teal btn-flat"
          onClick={playAgain}
        >
          Play again
        </button>
      </div>
    </div>
  )
}

export default Endgame
