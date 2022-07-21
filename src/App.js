import { useEffect, useState } from 'react'
import axios from 'axios'
import Quiz from './components/Quiz'
import './App.css'
import shuffle from 'lodash/shuffle'
import he from 'he'

function App() {
  const [categories, setCategories] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [questionData, setQuestionData] = useState(null)

  useEffect(() => {
    const triviaCategoryListURL = 'https://opentdb.com/api_category.php'
    axios.get(triviaCategoryListURL).then((res) => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  useEffect(() => {
    selectedCategoryId &&
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${selectedCategoryId}&type=multiple`
        )
        .then((res) => {
          console.log(res.data)
          setSelectedCategoryName(res.data.results[0].category)
          setQuestionData(
            res.data.results.map((obj) => ({
              question: he.decode(obj.question),
              correctAnswer: he.decode(obj.correct_answer),
              answerChoices: shuffle([
                obj.correct_answer,
                ...obj.incorrect_answers,
              ]),
            }))
          )
        })
  }, [selectedCategoryId])

  const handleBack = () => {
    setSelectedCategoryId(null)
    setSelectedCategoryName('')
  }

  if (selectedCategoryId) {
    return (
      <>
        <button onClick={handleBack}>Back to categories</button>
        <Quiz categoryName={selectedCategoryName} questionData={questionData} />
      </>
    )
  }

  return (
    <section className="category-list container">
      <h1>Trivia Categories</h1>
      {categories &&
        categories.map((category) => (
          <div
            className="category"
            id={category.id}
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </div>
        ))}
    </section>
  )
}

export default App
