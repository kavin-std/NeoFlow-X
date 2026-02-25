import React from "react";
import ChatBox from "../components/ChatBox";

function Assistant() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        NeoFlow AI Assistant
      </h1>

      <ChatBox />
    </div>
  );
}

export default Assistant;