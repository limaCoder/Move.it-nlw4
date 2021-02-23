import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://www.github.com/limaCoder.png" alt="Mario Lima"/>
      <div>
        <strong>Mario Lima</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level 1
          </p>
      </div>
    </div>
  )
}