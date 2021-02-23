import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from "../components/experienceBar";
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';

import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (  
    <div className={styles.container}>
      <Head>
        <title>Ínicio | move.it</title>
      </Head>

      <ExperienceBar />
      
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
