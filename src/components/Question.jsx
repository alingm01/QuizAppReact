import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answer";
import QUESTIONS from '../../question.js'

export default function Question({ 
  index,
  onSelectAnswer,
  onSkipAnswer
}) {

  console.log(QUESTIONS)
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      })

      setTimeout(() => {
        onSelectAnswer(answer)
      },2000)
    }, 1000)
  }

  let answerState = '';

  if (answer.selectedAnswer) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }

  return (
    <div id="question">
      <QuestionTimer 
        timeout={10000} 
        onTimeout={onSkipAnswer}
      />
      <h2 id="question">{QUESTIONS[index].text}</h2>
      <Answers 
        answerState={answerState}
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}