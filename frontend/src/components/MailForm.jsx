import React, { useState } from "react";

function MailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [purpose, setPurpose] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();

    const preview = `To: ${to}

Subject: ${subject}

Hello,

This is a ${tone.toLowerCase()} email regarding ${purpose}.

I hope you are doing well. I wanted to reach out concerning ${purpose}.
Please let me know your availability and thoughts.

Best regards,
(Your Name)`;

    setGeneratedMail(preview);
  };

  return (
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    maxWidth: "500px",
  }}
>
      <form
        onSubmit={handleGenerate}
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          width: "100%",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Generate Email</h2>

        <label>Recipient Email</label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="client@gmail.com"
          style={inputStyle}
          required
        />

        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Project Update"
          style={inputStyle}
          required
        />

        <label>Email Tone</label>
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

        <label>Purpose</label>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Explain why you are sending this email..."
          style={{ ...inputStyle, height: "100px", resize: "none" }}
          required
        />

        <button type="submit" style={buttonStyle}>
          Generate Mail
        </button>
      </form>

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          width: "100%",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          whiteSpace: "pre-wrap",
        }}
      >
        <h2>Preview</h2>

        {generatedMail ? (
          <p>{generatedMail}</p>
        ) : (
          <p style={{ color: "#777" }}>
            Your generated email will appear here...
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export default MailForm;