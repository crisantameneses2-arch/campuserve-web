function RegistrarDashboard({ user, onLogout }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Registrar Dashboard</h1>
      <p>Welcome, {user.fullName}!</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default RegistrarDashboard;