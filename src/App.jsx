import { useState, useEffect } from "react";
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import PendingVerifications from './PendingVerifications';
import AlumniSignup from './AlumniSignup';
import GoogleLogin from './GoogleLogin';
import DocumentRequestForm from './DocumentRequestForm';
import DocumentRequestsReview from './DocumentRequestsReview';




function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState([]);
  const [view, setView] = useState("home");

  useEffect(() => {
  fetch('http://localhost:3000/api/test')
    .then((res) => {
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      return res.json();
    })
    .then((data) => setTestData(Array.isArray(data) ? data : []))
    .catch((err) => console.error('Failed to fetch test data:', err));
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

  if (view === "googleLogin") {
    return (
      <div>
        <button onClick={() => setView("home")}>← Back</button>
        <GoogleLogin />
      </div>
    );
  }

  if (view === "documentRequestForm") {
    return (
      <div>
        <button onClick={() => setView("home")}>← Back</button>
        <DocumentRequestForm />
      </div>
    );
  }

  if (view === "documentRequestsReview") {
    return (
      <div>
        <button onClick={() => setView("home")}>← Back</button>
        <DocumentRequestsReview />
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
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <br /><br />
        <button onClick={() => setView("pending")}>View Pending Alumni Verifications</button>
        <br /><br />
        <button onClick={() => setView("alumniSignup")}>Alumni Signup</button>
        <br /><br />
        <button onClick={() => setView("googleLogin")}>Google Sign-In</button>
        <br /><br />
        <button onClick={() => setView("documentRequestForm")}>Request a Document</button>
        <br /><br />
        <button onClick={() => setView("documentRequestsReview")}>Review Document Requests (Registrar)</button>
      </section>
    </>
  );
}

export default App;