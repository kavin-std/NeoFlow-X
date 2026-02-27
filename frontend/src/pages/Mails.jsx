import React, { useState } from "react";
import { apiRequest } from "../utils/api";

function Mails() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");

    try {
      const response = await apiRequest("/api/ai/summarize-mails", {
        method: "POST",
      });

      setSummary(response?.summary || "No summary received.");
    } catch (error) {
      setSummary("Error summarizing emails.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Mails</h2>
      <p>Inbox summary powered by AI.</p>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleSummarize}
          style={{
            padding: "10px 16px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Summarizing..." : "Summarize Recent Emails"}
        </button>

        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            background: "#f9fafb",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "120px",
          }}
        >
          {summary || "Summary will appear here..."}
        </div>
      </div>
    </div>
  );
}

export default Mails;