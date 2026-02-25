import React from "react";
import MailForm from "../components/MailForm";

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

      <MailForm />
    </div>
  );
}

export default Mail;