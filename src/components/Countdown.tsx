import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeOut: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setisActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut)
    setisActive(false)
    setTime(0.1 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout (() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      console.log('finalizado');
      setHasFinished(true);
      setisActive(false);
      startNewChallenge()
    }
  }, [isActive, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>         
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
        disabled
        className={styles.countdownButton}
        >
         Ciclo encerrado
        </button>
      ) : (
        isActive ? (
          <button 
          type='button'
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
          >
           Abandonar ciclo
          </button>
        ) : (
          <button 
        type='button'
        className={styles.countdownButton}
        onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
        )
      ) }
    </div>
  )
}