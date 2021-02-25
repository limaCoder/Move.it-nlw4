import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from "../components/experienceBar";
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (  
    <div className={styles.container}>
      <Head>
        <title>Ínicio | move.it</title>
      </Head>

      <ExperienceBar />
      
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div className={styles.challengeBoxContainer}>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
