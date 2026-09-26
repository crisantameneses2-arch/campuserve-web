import { useState, useEffect } from "react";

function PendingVerifications() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = () => {
    fetch("http://localhost:3000/api/alumni/pending")
      .then((res) => res.json())
      .then((data) => {
        setPending(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleReview = (id, decision) => {
    fetch(`http://localhost:3000/api/alumni/review/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, staffId: 1 }), // staffId hardcoded for now, until staff login exists
    })
      .then((res) => res.json())
      .then(() => {
        // Refresh the list after approving/rejecting
        fetchPending();
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading pending verifications...</p>;

  if (pending.length === 0) return <p>No pending alumni verifications.</p>;

  return (
    <div>
      <h1>Pending Alumni Verifications</h1>
      {pending.map((item) => (
        <div key={item.verification_id} style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px" }}>
          <p><strong>Student ID:</strong> {item.student_id}</p>
          <p><strong>Full Name:</strong> {item.full_name}</p>
          {item.document_url && (
            <img src={item.document_url} alt="Submitted document" style={{ maxWidth: "300px" }} />
          )}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleReview(item.verification_id, "approved")}>
              Approve
            </button>
            <button onClick={() => handleReview(item.verification_id, "rejected")} style={{ marginLeft: "8px" }}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingVerifications;