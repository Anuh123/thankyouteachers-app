import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { teachers } from '../data/teachers';
import TypewriterEffect from './TypewriterEffect';
import './TeacherPage.css';

const TeacherPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");
  const teacher = teachers.find(t => t.slug === slug && t.key === key);

  const [showConfetti, setShowConfetti] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  if (!teacher) {
    return (
      <div className="retro-bg denied">
        <h1>🔒 Access Denied</h1>
      </div>
    );
  }

  const downloadCode = () => {
    const blob = new Blob([teacher.code], { type: "text/plain" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = teacher.filename;
    a.click();
  };

  const salute = () => {
    setShowConfetti(true);

    if (!musicStarted) {
      const audio = document.getElementById("bg-music");
      if (audio) {
        audio.volume = 0.1;
        audio.play().catch(e => console.log("Autoplay blocked:", e));
        setMusicStarted(true);
      }
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div
      className="retro-bg"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/pixel-space-bg.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <audio id="bg-music" src="/sounds/soft-piano.mp3" loop />
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div className="retro-window">
        <div className="retro-title">
          🖥️ Your existence changed our path — {teacher.name}
        </div>

        <TypewriterEffect text={teacher.quote + "\n\n" + teacher.code} />

        <div className="retro-buttons">
          <button onClick={salute} className="retro-btn">🎉 See Our Love 4 U!</button>
          <button onClick={downloadCode} className="retro-btn">💾 Download Our Code</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
