const Calendar = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Calendar</h1>

      <div style={calendarContainer}>
        <div style={calendarHeader}>
          <span>February 2026</span>
        </div>

        <div style={calendarGrid}>
          {days.map((day, index) => (
            <div key={index} style={dayCell}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const days = [
  "", "", "", "", "", "", 1,
  2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28
];

const calendarContainer = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
};

const calendarHeader = {
  fontWeight: "bold",
  marginBottom: "15px",
  fontSize: "18px",
};

const calendarGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "10px",
};

const dayCell = {
  background: "#f3f4f6",
  padding: "15px",
  textAlign: "center",
  borderRadius: "8px",
  minHeight: "50px",
};

export default Calendar;