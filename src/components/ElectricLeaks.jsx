import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

// List of months
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function ElectricLeaks() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerName, setCustomerName] = useState("");  // New state for customer name
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [chartData, setChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleGetReadings = async () => {
    if (!policyNumber || !selectedMonth) {
      alert("Please enter policy number and select a month");
      return;
    }

    // Simulating a fetch call (replace with your actual API)
    const response = await fetch(`/api/getReadings?policy=${policyNumber}&month=${selectedMonth}`);
    const data = await response.json();

    setCustomerName(data.customerName);  // Set customer name from API response
    setStartDate(data.policyStartDate);
    setEndDate(data.policyEndDate);
    setDiscount(data.eligibleDiscount);
    setChartData(data.voltages.map((v, index) => ({ date: index + 1, voltage: v })));
    setDataFetched(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        {/* Policy Number Input */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Policy Number:</label>
          <input 
            type="text" 
            value={policyNumber} 
            onChange={(e) => setPolicyNumber(e.target.value)} 
            placeholder="Enter Policy Number" 
          />
        </div>

        {/* Customer Name Input */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Customer Name:</label>
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            placeholder="Enter Customer Name" 
          />
        </div>

        {/* Month Dropdown */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>Select Month:</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <button onClick={handleGetReadings} style={styles.button}>Get Readings</button>

        {/* Displaying fetched data */}
        {dataFetched && (
          <div style={styles.dataContainer}>
            <p>Customer Name: {customerName}</p>
            <p>Policy Start Date: {startDate}</p>
            <p>Policy End Date: {endDate}</p>
            <p>Eligible for Discount: {discount}</p>
          </div>
        )}

        {/* Chart */}
        <LineChart width={500} height={300} data={chartData}>
          <XAxis dataKey="date" label={{ value: "Date", position: "insideBottom" }} />
          <YAxis label={{ value: "Voltage", angle: -90, position: "insideLeft" }} />
          <Line type="monotone" dataKey="voltage" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

// Inline style for the background image and dashboard components
const styles = {
  container: {
    backgroundImage: "url('your-image-path.jpg')", // Put your image path here
    backgroundSize: "cover", // Ensure the image covers the entire background
    backgroundPosition: "center",
    minHeight: "100vh", // Make the container fill the screen height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  dashboard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background for the dashboard
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "5px",
    textAlign: "left",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dataContainer: {
    marginTop: "20px",
  },
};

export default ElectricLeaks;
