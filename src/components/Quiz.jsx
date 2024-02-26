import { useState, useCallback } from "react"
import QUESTIONS from '../../question';
import completedLogo from '../assets/quiz-complete.png';
import Question from "./Question";

export default function Quiz() {
 
  const [answerState, setAnswerState] = useState('')
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const QuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');

    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    })

    setTimeout(() => {
      if(QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);

    }, 1000);

  }, 
  [activeQuestionIndex]
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
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
    
  )
}