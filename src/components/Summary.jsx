import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../../question.js';


export default function Summary({ userAnswers }) {
  const skippedAnswers = Math.round((userAnswers.filter(answer => answer === null).length/userAnswers.length) * 100);

  const correctAnswers = Math.round((userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length/userAnswers.length) * 100)
  console.log(correctAnswers)

  const wrongAnswers = 100 - skippedAnswers - correctAnswers;


  return (
    <div id='summary'>
      <img src={quizCompleteImg} alt="trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswers}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswers}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswers}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if(answer === null) {
            cssClass += ' skipped';
          } else if (QUESTIONS[index].answers[0] === answer) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}