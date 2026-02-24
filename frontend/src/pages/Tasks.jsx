const Tasks = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Task Manager</h1>

      <div style={taskContainer}>
        <div style={taskCard}>
          <h3>To Do</h3>
          <div style={taskItem}>📝 Design landing page</div>
          <div style={taskItem}>📝 Prepare client proposal</div>
        </div>

        <div style={taskCard}>
          <h3>In Progress</h3>
          <div style={taskItem}>🚀 Build dashboard UI</div>
        </div>

        <div style={taskCard}>
          <h3>Completed</h3>
          <div style={taskItem}>✅ Setup project structure</div>
        </div>
      </div>
    </div>
  );
};

// Set a maxWidth and center the container for desktop, allow responsiveness for smaller screens
const taskContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  maxWidth: "900px",
  margin: "0 auto",
  width: "100%",
};

const taskCard = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
};

const taskItem = {
  background: "#f3f4f6",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "10px",
};

export default Tasks;