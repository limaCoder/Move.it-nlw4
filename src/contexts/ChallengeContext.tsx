import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'Body' | 'Eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number; 
  currentExperience: number;
  experienceToNextLevel: number; 
  challengesCompleted: number; 
  activeChallenge: Challenge;
  levelUp: () => void;
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({
  children, 
  ...rest}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  useEffect(() => {
    Notification.requestPermission();
  }, []) // quando o array estiver vazio, a função no primeiro parâmetro será disparada uma única vez quando esse componente for exibido em tela

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return; // uma validação na qual o usuário não pode chamar a função se o desafio não estiver ativo
    }

    const { amount } = activeChallenge; // buscar do meu activeChallenge o quanto de experiência ele dá

    let finalExperience = currentExperience + amount; // o tanto de experiência que o desafio vai dar

    if(finalExperience > experienceToNextLevel) { // se a experiência obtida for maior que a experiência que precisa para passar de nível, subtrai o valor restante e upa de level
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null); // ao completar o desafio ele é zerado
    setChallengesCompleted(challengesCompleted + 1); // aumenta o número de desafios completados
  }
  
  return(
    <ChallengeContext.Provider 
    value={{ 
      level, 
      currentExperience, 
      experienceToNextLevel,
      challengesCompleted, 
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
      }}
      >
        {children}

        { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}