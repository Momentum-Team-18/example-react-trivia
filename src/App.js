import { useEffect, useState } from 'react'
import axios from 'axios'
import Quiz from './components/Quiz'
import './App.css'
import shuffle from 'lodash/shuffle'
import he from 'he'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [categories, setCategories] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [questionData, setQuestionData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('First useEffect, requesting categories')
    const triviaCategoryListURL = 'https://opentdb.com/api_category.php'
    axios.get(triviaCategoryListURL).then((res) => {
      setCategories(res.data.trivia_categories)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    selectedCategoryId &&
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&category=${selectedCategoryId}&type=multiple`
        )
        .then((res) => {
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
        <button onClick={handleBack} className="btn-small">
          Back to categories
        </button>
        <Quiz
          categoryName={selectedCategoryName}
          questionData={questionData}
          playAgain={handleBack}
        />
      </>
    )
  }

  console.log('Conditional render of loading component')
  if (loading) {
    //https://github.com/dvtng/react-loading-skeleton
    return (
      <>
        <h1>Trivia Categories</h1>
        <Skeleton
          count={24}
          className="skeleton-item"
          containerClassName="category-list"
          width={'80%'}
        />
      </>
    )
  }

  console.log('about to return the JSX for the category list')
  return (
    <>
      <h1>Trivia Categories</h1>
      <section className="category-list container">
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
    </>
  )
}

export default App
