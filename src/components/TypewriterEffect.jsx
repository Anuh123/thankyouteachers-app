import { useEffect, useState } from 'react';

const TypewriterEffect = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <pre style={{
      background: "#ffe0f0",
      color: "#2c2c2c",
      padding: "1.5em",
      fontFamily: "'Comfortaa', sans-serif",
      fontSize: "16px",
      border: "2px inset #999",
      borderRadius: "12px",
      boxShadow: "4px 4px 0px #999",
      whiteSpace: "pre-wrap",
      lineHeight: "1.8"
    }}>
      {displayed}
    </pre>
  );
};

export default TypewriterEffect;
