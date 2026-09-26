import { useState, useEffect } from "react";
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import PendingVerifications from './PendingVerifications';
import AlumniSignup from './AlumniSignup';
import GoogleLogin from './GoogleLogin';
import Login from './Login';
import StudentDashboard from './dashboards/StudentDashboard';
import RegistrarDashboard from './dashboards/RegistrarDashboard';
import SupplyDashboard from './dashboards/SupplyDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState([]);
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/test')
      .then((res) => res.json())
      .then((data) => setTestData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => setUser(null);

  if (user) {
    if (user.role === "student") return <StudentDashboard user={user} onLogout={handleLogout} />;
    if (user.role === "registrar") return <RegistrarDashboard user={user} onLogout={handleLogout} />;
    if (user.role === "supply") return <SupplyDashboard user={user} onLogout={handleLogout} />;
    if (user.role === "admin") return <AdminDashboard user={user} onLogout={handleLogout} />;
    return <p>Unknown role: {user.role}</p>;
  }

  if (view === "pending") {
    return <div><button onClick={() => setView("home")}>← Back</button><PendingVerifications /></div>;
  }
  if (view === "alumniSignup") {
    return <div><button onClick={() => setView("home")}>← Back</button><AlumniSignup /></div>;
  }
  if (view === "googleLogin") {
    return <div><button onClick={() => setView("home")}>← Back</button><GoogleLogin /></div>;
  }

  return (
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="hero" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
      <h1>CampuServe</h1>
      {testData.map((row) => <p key={row.id}>{row.message}</p>)}

      <Login onLoginSuccess={(data) => setUser(data)} />

      <br /><br />
      <button onClick={() => setView("pending")}>View Pending Alumni Verifications (Registrar test view)</button>
      <br /><br />
      <button onClick={() => setView("alumniSignup")}>Alumni Signup (test view)</button>
      <br /><br />
      <button onClick={() => setView("googleLogin")}>Google Sign-In (test view)</button>
    </section>
  );
}

export default App;