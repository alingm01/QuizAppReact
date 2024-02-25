import { useState, useCallback } from "react"
import QUESTIONS from '../../question';
import completedLogo from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

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
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5)

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
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = '';

            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            } 
            
            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button  onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                  {answer}
                </button>
              </li>
            )
          })}
        </ul>
      </div> 
    </div>
  )
}