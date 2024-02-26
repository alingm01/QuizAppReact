import QuestionTimer from "./QuestionTimer"
import Answers from "./Answer"

export default function Question({ 
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer
}) {
  return (
    <div id="question">
      <QuestionTimer 
        timeout={10000} 
        onTimeout={onSkipAnswer}
      />
      <h2 id="question">{questionText}</h2>
      <Answers 
        answerState={answerState}
        answers={answers}
        selectedAnswer={selectedAnswer}
        onSelect = {onSelectAnswer}
      />
    </div>
  )
}