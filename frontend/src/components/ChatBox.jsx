import React, { useState } from "react";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const userMessage = { sender: "user", text: message };

    const botReply = {
      sender: "bot",
      text: "NeoFlow Assistant: I noted that. This feature will help organize your work automatically."
    };

    setChat([...chat, userMessage, botReply]);
    setMessage("");
  };

  return (
    <div
      style={{
        width: "320px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "500px",
      }}
    >
      <div
        style={{
          background: "#3b82f6",
          color: "white",
          padding: "12px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          fontWeight: "bold",
        }}
      >
        NeoFlow Assistant
      </div>

      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          background: "#f4f6fb",
        }}
      >
        {chat.length === 0 && (
          <p style={{ color: "#777" }}>
            Ask me about scheduling, emails, or tasks...
          </p>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                background: msg.sender === "user" ? "#3b82f6" : "#e5e7eb",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;