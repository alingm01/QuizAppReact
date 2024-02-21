import { useState } from "react"
import QUESTIONS from '../../question';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const userAnswerIndex = userAnswers.length;

  function handleClick(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    })
  }

  return (
    <div id="quiz">
      <div>
        <h2 id="question">{QUESTIONS[userAnswerIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[userAnswerIndex].answers.map(answer => (
            <li key={answer} className="answer">
              <button  onClick={() => handleClick(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div> 
    </div>
  )
}