import React, { useState } from "react";
import { apiRequest } from "../utils/api";

function MailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [purpose, setPurpose] = useState("");
  const [reason, setReason] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [links, setLinks] = useState("");
  const [comments, setComments] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // 🔹 Generate Preview Only
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedMail("");

    try {
      const response = await apiRequest("/api/ai/generate-mail", {
        method: "POST",
        body: JSON.stringify({
          to,
          subject,
          tone,
          purpose,
        }),
      });

      setGeneratedMail(
        response?.content ||
        response?.email ||
        "No response received."
      );
    } catch (error) {
      setGeneratedMail("Error generating mail.");
    }

    setLoading(false);
  };

  // 🔹 Send Structured Email
  const handleSend = async () => {
    if (!generatedMail) {
      alert("Generate email first.");
      return;
    }

    setSending(true);

    try {
      await apiRequest("/api/ai/write-and-send", {
        method: "POST",
        body: JSON.stringify({
          to,
          subject,
          context: purpose,
          tone,
          reason,
          dueDate,
          dueTime,
          links,
          comments,
        }),
      });

      alert("Mail sent successfully 🚀");
    } catch (error) {
      alert("Error sending mail.");
    }

    setSending(false);
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <form
        onSubmit={handleGenerate}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h2>AI Mail Generator</h2>

        <input
          type="email"
          placeholder="Recipient Email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
          required
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          style={inputStyle}
        >
          <option>Professional</option>
          <option>Friendly</option>
          <option>Formal</option>
          <option>Apologetic</option>
          <option>Request</option>
        </select>

        <textarea
          placeholder="Main Context / Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
          required
        />

        <textarea
          placeholder="Reason (Optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ ...inputStyle, height: "60px" }}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />

        <label>Due Time</label>
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Relevant Links (Optional)"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Additional Comments (Optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ ...inputStyle, height: "60px" }}
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Generating..." : "Generate Mail"}
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={sending}
          style={{
            ...buttonStyle,
            marginTop: "10px",
            background: "#10b981",
          }}
        >
          {sending ? "Sending..." : "Send Mail"}
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Preview</h3>
        {generatedMail || "Generated email will appear here..."}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default MailForm;