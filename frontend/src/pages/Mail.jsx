import React from "react";
import MailForm from "../components/MailForm";
import ChatBox from "../components/ChatBox";

function Mail() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#eef1f7",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>AI Mail Generator</h1>

     <div
  style={{
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  }}
>
  <MailForm />
  <ChatBox />
</div>
    </div>
  );
}

export default Mail;