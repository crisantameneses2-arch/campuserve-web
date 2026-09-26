import { useState, useEffect } from "react";
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import PendingVerifications from './PendingVerifications';
import AlumniSignup from './AlumniSignup';

function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState([]);
  const [view, setView] = useState("home"); // "home", "pending", or "alumniSignup"

  useEffect(() => {
    fetch('http://localhost:3000/api/test')
      .then((res) => res.json())
      .then((data) => setTestData(data))
      .catch((err) => console.error(err));
  }, []);

  if (view === "pending") {
    return (
      <div>
        <button onClick={() => setView("home")}>← Back</button>
        <PendingVerifications />
      </div>
    );
  }

  if (view === "alumniSignup") {
    return (
      <div>
        <button onClick={() => setView("home")}>← Back</button>
        <AlumniSignup />
      </div>
    );
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="hero" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>CampuServe</h1>
          {testData.map((row) => (
            <p key={row.id}>{row.message}</p>
          ))}
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <br /><br />
        <button onClick={() => setView("pending")}>
          View Pending Alumni Verifications (Registrar test view)
        </button>
        <br /><br />
        <button onClick={() => setView("alumniSignup")}>
          Alumni Signup (test view)
        </button>
      </section>
    </>
  );
}

export default App;