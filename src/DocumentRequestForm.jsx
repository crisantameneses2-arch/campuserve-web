import { useState } from "react";

function DocumentRequestForm() {
  const [studentId, setStudentId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [requestedSchedule, setRequestedSchedule] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/api/documents/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          documentType,
          purpose,
          numberOfCopies,
          requestedSchedule,
        }),
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
      <h1>Request a Document</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Student ID</label><br />
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Document Type</label><br />
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required style={{ width: "100%", padding: "6px" }}>
            <option value="">-- Select --</option>
            <option value="Transcript of Records">Transcript of Records</option>
            <option value="Certificate of Enrollment">Certificate of Enrollment</option>
            <option value="Good Moral Certificate">Good Moral Certificate</option>
            <option value="Diploma Copy">Diploma Copy</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Purpose</label><br />
          <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Number of Copies</label><br />
          <input type="number" min="1" value={numberOfCopies} onChange={(e) => setNumberOfCopies(e.target.value)} style={{ width: "100%", padding: "6px" }} />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Preferred Claiming Date & Time</label><br />
          <input type="datetime-local" value={requestedSchedule} onChange={(e) => setRequestedSchedule(e.target.value)} required style={{ width: "100%", padding: "6px" }} />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {result && !result.error && (
        <div style={{ marginTop: "16px", padding: "12px", border: "1px solid #ccc" }}>
          <p>✅ {result.message}</p>
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

export default DocumentRequestForm;