function AdminDashboard({ user, onLogout }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.fullName}!</p>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default AdminDashboard;
