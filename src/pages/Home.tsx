import { useState } from 'react';
import BirthdayIntro from '../components/BirthdayIntro';
import BirthdayCake from '../components/BirthdayCake';
import PageLayout from '../components/layout/PageLayout';

export default function Home() {
  const [showCake, setShowCake] = useState(false);

  return (
    <PageLayout>
      {!showCake ? (
        <BirthdayIntro years={21} onComplete={() => setShowCake(true)} />
      ) : (
        <BirthdayCake />
      )}
    </PageLayout>
  );
}
