import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LeakAnalyticsDynamic(){
  const [graphType, setGraphType] = useState("Average Leak Rate");
  const [leakData, setLeakData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const staticDates = ["01/24", "02/24", "03/24", "04/24", "05/24","06/24","07/24","08/24","09/24","10/24","11/24","12/24"];

  // Fetch leak data from API
 useEffect(() => {
        
        fetch("https://api.example.com/leak-rates")
        .then(response=>response.json())
        .then(data=>{
        setLeakData(data);
        setLoading(false);
        })
   
    },[]);


    
//prepare data for chart
const data = {
    labels: staticDates,
    datasets: [
      {
        
       // data: [2, 2.5, 2.8, 3, 2.4],
        data:leakData.map((item) => item.rate),
        backgroundColor: "green",
        label: "Average Leak Rate (GPM)",
        borderRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Leaks Analytics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Leak Rate",
        },
      },
    },
  };

  return (
      <div className="p-6 w-full max-w-2xl mx-auto">
          
        {/* Chart */}
        <div className="bg-white p-4 shadow rounded">
          
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };
  
export default LeakAnalyticsDynamic;
