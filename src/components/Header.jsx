import imageLogo from '../assets/quiz-logo.png'

export default function Header() {
  return (
    <header>
      <img src={imageLogo} alt='quiz image logo'/>
      <p>React Quiz App</p>
    </header>
  )
}