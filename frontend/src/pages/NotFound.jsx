const NotFound = ({ darkMode }) => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: darkMode ? "#ffffff" : "#111827",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;