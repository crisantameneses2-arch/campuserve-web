import { useState } from "react";

function AlumniSignup() {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const formData = new FormData();
    formData.append("accountId", 1); // temporary placeholder until account creation is built
    formData.append("studentId", studentId);
    formData.append("fullName", fullName);
    if (file) {
      formData.append("document", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/alumni/verify-upload", {
        method: "POST",
        body: formData, // no Content-Type header needed, browser sets it automatically for FormData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Something went wrong. Please try again." });
    }

    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Alumni Verification</h1>
      <p>No institutional email? Verify your identity to create an account.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Student ID</label><br />
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Full Name</label><br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Supporting Document (old ID, diploma, etc.)</label><br />
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p style={{ fontSize: "12px", color: "#666" }}>
            Only required if we can't automatically match your record.
          </p>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {result && !result.error && (
        <div style={{ marginTop: "16px", padding: "12px", border: "1px solid #ccc" }}>
          {result.status === "auto_verified" ? (
            <p>✅ {result.message}</p>
          ) : (
            <p>⏳ {result.message}</p>
          )}
        </div>
      )}

      {result?.error && (
        <div style={{ marginTop: "16px", color: "red" }}>
          <p>{result.error}</p>
        </div>
      )}
    </div>
  );
}

export default AlumniSignup;