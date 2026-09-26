import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

function GoogleLogin() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setResult(null);

    try {
      const googleResult = await signInWithPopup(auth, googleProvider);
      const email = googleResult.user.email;

      // Send this verified email to our backend to check against the users table
      const res = await fetch("http://localhost:3000/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Google sign-in failed. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>CampuServe Login</h1>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      {result && !result.error && (
        <div style={{ marginTop: "16px" }}>
          {result.authorized ? (
            <p>✅ Welcome, {result.fullName}! Role: {result.role}</p>
          ) : (
            <p>❌ {result.message}</p>
          )}
        </div>
      )}

      {result?.error && (
        <p style={{ color: "red", marginTop: "16px" }}>{result.error}</p>
      )}
    </div>
  );
}

export default GoogleLogin;