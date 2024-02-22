import { useState } from "react"
import QUESTIONS from '../../question';
import completedLogo from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const QuizCompleted = activeQuestionIndex === QUESTIONS.length;

  if (QuizCompleted) {
    return (
      <div id="summary">
        <img src={completedLogo} alt="completed quiz trophy" />
        <h2>Quiz Completed</h2>
      </div>
    )
  }
  const answers = [...QUESTIONS[activeQuestionIndex].answers];
  const shuffledAnswers = answers.sort(()=>Math.random - 0.5)

  function handleSelectAnswer(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    })
  }

  return (
    <div id="quiz">
      <div>
        <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
        <h2 id="question">{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button  onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div> 
    </div>
  )
}