const Result = ({ outcome, showMsg }) => {
  const msgCorrect =
    '🐔 Hello I am here to tell you that you got this question right 🐔'
  const msgIncorrect = '🎺 Wrong! Womp womp. 🎺'
  const outcomeClass = outcome ? 'green': 'red'
  const cssClasses = `result ${outcomeClass} lighten-4`

  return (
    <div className={cssClasses} >{ outcome ? msgCorrect : msgIncorrect}</div>
  )
}

export default Result
