import { useState, useCallback } from "react"
import QUESTIONS from '../../question';
import completedLogo from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const QuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    })
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

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



  return (
    <div id="quiz">
      <div>
        <QuestionTimer 
          key={activeQuestionIndex}
          timeout={10000} 
          onTimeout={handleSkipAnswer}
        />
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