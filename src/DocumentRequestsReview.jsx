import { useState, useEffect } from "react";

function DocumentRequestsReview() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = () => {
    fetch("http://localhost:3000/api/documents/pending")
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
    fetch(`http://localhost:3000/api/documents/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.claimCode) {
          alert(`Approved! Claim code: ${data.claimCode}`);
        }
        fetchPending();
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading pending document requests...</p>;
  if (pending.length === 0) return <p>No pending document requests.</p>;

  return (
    <div>
      <h1>Pending Document Requests</h1>
      {pending.map((item) => (
        <div key={item.request_id} style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px" }}>
          <p><strong>Student ID:</strong> {item.student_id}</p>
          <p><strong>Document:</strong> {item.document_type}</p>
          <p><strong>Purpose:</strong> {item.purpose || "N/A"}</p>
          <p><strong>Copies:</strong> {item.number_of_copies}</p>
          <p><strong>Requested Date:</strong> {item.requested_date}</p>
          <p><strong>Requested Time:</strong> {item.requested_time}</p>
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleReview(item.request_id, "processing")}>
              Approve
            </button>
            <button onClick={() => handleReview(item.request_id, "cancelled")} style={{ marginLeft: "8px" }}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentRequestsReview;