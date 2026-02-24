const Settings = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Settings</h1>
      <div style={containerStyle}>Settings content area</div>
    </div>
  );
};

const containerStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export default Settings;