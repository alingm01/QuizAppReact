import { useState, useCallback } from "react"
import QUESTIONS from '../../question';
import completedLogo from '../assets/quiz-complete.png';
import Question from "./Question";

export default function Quiz() {
 
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const QuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    })
  }, 
  []
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if (QuizCompleted) {
    return (
      <div id="summary">
        <img src={completedLogo} alt="completed quiz trophy" />
        <h2>Quiz Completed</h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <Question 
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}