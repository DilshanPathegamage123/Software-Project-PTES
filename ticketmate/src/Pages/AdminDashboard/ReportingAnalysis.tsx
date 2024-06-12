
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useRef } from "react";

// import "./Reporting&Analysis.css";

// import { Bar, Line } from "react-chartjs-2";
// import "chart.js/auto";

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import html2canvas from "html2canvas";

// const ReportAnlysis = () => {
//   type Vehicle = {
//     id: number;
//     vehicleNo: string;
//     vehicleOwner: string;
//     income: number;
//     predictedIncome: number;
//     totalPassengers: number;
//     rate: number;
//     date: string;
//   };

//   const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
//   const [filteredData, setFilteredData] = useState<Vehicle[]>([]);
//   const [selectedVehicleType, setSelectedVehicleType] = useState<string>("");
//   const [selectedDateFilter, setSelectedDateFilter] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const barChartRef = useRef<HTMLDivElement>(null);
//   const lineChartRef = useRef<HTMLDivElement>(null);

//   // const [serchByRate, setSerchByRate] = useState<string>("");

//   useEffect(() => {
//     // Fetch vehicle data from the API
//     axios
//       .get("https://localhost:7257/api/Reports")
//       .then((response) => {
//         // Set the fetched vehicle data to the state variable vehicleData
//         setVehicleData(response.data);
//         // Set the filtered data to the fetched vehicle data initially
//         setFilteredData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     // Filter the data whenever the selected vehicle type, date filter, or search query changes
//     filterData();
//   }, [selectedVehicleType, selectedDateFilter, searchQuery]); //searcchByRate

//   function filterData() {
//     let filtered = vehicleData;

//     // Filter by selected vehicle type
//     if (selectedVehicleType === "Bus") {
//       filtered = filtered.filter(
//         (vehicle) => !vehicle.vehicleNo.includes("TRN")
//       );
//     } else if (selectedVehicleType === "Train") {
//       filtered = filtered.filter((vehicle) =>
//         vehicle.vehicleNo.includes("TRN")
//       );
//     }

//     // Filter by selected date filter
//     if (selectedDateFilter === "CurrentDate") {
//       filtered = filtered.filter((vehicle) => isCurrentDate(vehicle.date));
//     } else if (selectedDateFilter === "CurrentMonth") {
//       filtered = filtered.filter((vehicle) => isCurrentMonth(vehicle.date));
//     } else if (selectedDateFilter === "Last3Months") {
//       filtered = filtered.filter((vehicle) => isLastThreeMonths(vehicle.date));
//     } else if (selectedDateFilter === "CurrentYear") {
//       filtered = filtered.filter((vehicle) => isCurrentYear(vehicle.date));
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (vehicle) => vehicle.vehicleNo.includes(searchQuery.toUpperCase())

//         // vehicle.rate.toString().includes(serchByRate.toUpperCase())
//       );
//     }

//     // Update the filtered data state
//     setFilteredData(filtered);
//   }

//   function isCurrentDate(date: string) {
//     const currentDate = new Date().toISOString().split("T")[0];
//     return date === currentDate;
//   }

//   function isCurrentMonth(date: string) {
//     const currentMonth = new Date().toISOString().slice(0, 7);
//     return date.slice(0, 7) === currentMonth;
//   }

//   function isLastThreeMonths(date: string) {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();
//     const threeMonthsAgo = new Date(
//       currentYear,
//       currentMonth - 2,
//       currentDate.getDate()
//     )
//       .toISOString()
//       .slice(0, 7);
//     return date.slice(0, 7) >= threeMonthsAgo;
//   }

//   function isCurrentYear(date: string) {
//     const currentYear = new Date().getFullYear().toString();
//     return date.slice(0, 4) === currentYear;
//   }

//   // Event handlers
//   // Handle the change event of the vehicle type radio buttons
//   function handleVehicleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSelectedVehicleType(event.target.value);
//   }

//   // Handle the change event of the date filter select
//   function handleDateFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
//     setSelectedDateFilter(event.target.value);
//   }

//   // Handle the change event of the search input
//   function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setSearchQuery(event.target.value);
//     // setSerchByRate(event.target.value);
//   }

//   // Prepare data for the bar chart
//   // Calculate average rate for each vehicle owner
//   const barChartData = {
//     labels: filteredData.map((vehicle) => vehicle.vehicleOwner),
//     datasets: [
//       {
//         label: "Rate",
//         data: filteredData.map((vehicle) => vehicle.rate),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Prepare data for the line chart
//   const lineChartData = {
//     labels: filteredData.map((vehicle) => vehicle.vehicleOwner),
//     datasets: [
//       {
//         label: "Income",
//         data: filteredData.map((vehicle) => vehicle.income),
//         borderColor: "rgba(75, 192, 192, 0.6)", // Aqua color
//         borderWidth: 1,
//         fill: false,
//       },
//       {
//         label: "Predicted Income",
//         data: filteredData.map((vehicle) => vehicle.predictedIncome),
//         borderColor: "rgba(255, 99, 132, 0.6)", // Red color
//         borderWidth: 1,
//         fill: false,
//       },
//     ],
//   };

//   //the pdf download function
//   async function downloadPDF() {
//     const doc = new jsPDF();

//     // Capture bar chart as image
//     const barChartElement = barChartRef.current;
//     const barChartCanvas = barChartElement?.querySelector("canvas");
//     let barChartImage = "";

//     if (barChartCanvas instanceof HTMLCanvasElement) {
//       barChartImage = await html2canvas(barChartCanvas).then((canvas) =>
//         canvas.toDataURL("image/png")
//       );
//     }

//     // Capture line chart as image
//     const lineChartElement = lineChartRef.current;
//     const lineChartCanvas = lineChartElement?.querySelector("canvas");
//     let lineChartImage = "";

//     if (lineChartCanvas instanceof HTMLCanvasElement) {
//       lineChartImage = await html2canvas(lineChartCanvas).then((canvas) =>
//         canvas.toDataURL("image/png")
//       );
//     }

//     // Add the table to the PDF first
//     doc.autoTable({
//       head: [
//         [
//           "Vehicle Owner",
//           "Vehicle No",
//           "Income",
//           "No of Passengers",
//           "Predicted Income",
//           "Rate",
//         ],
//       ],
//       body: filteredData.map((vehicle) => [
//         vehicle.vehicleOwner,
//         vehicle.vehicleNo,
//         vehicle.income,
//         vehicle.totalPassengers,
//         vehicle.predictedIncome,
//         vehicle.rate,
//       ]),
//       startY: 10, // Start from a bit below the top
//     });

//     // Get the current height of the document
//     const tableHeight = doc.autoTable.previous.finalY;

//     // Determine if there's enough space for both charts on the same page
//     const chartHeight = 80; // Height of each chart
//     const remainingSpace = doc.internal.pageSize.getHeight() - tableHeight;

//     // Add the charts to the PDF
//     if (barChartImage && lineChartImage) {
//       if (remainingSpace >= 2 * chartHeight) {
//         // Enough space for both charts on the same page
//         doc.addImage(
//           barChartImage,
//           "PNG",
//           10,
//           tableHeight + 10,
//           190,
//           chartHeight
//         );
//         doc.addImage(
//           lineChartImage,
//           "PNG",
//           10,
//           tableHeight + chartHeight + 20,
//           190,
//           chartHeight
//         );
//       } else if (remainingSpace >= chartHeight) {
//         // Enough space for one chart on the current page
//         doc.addImage(
//           barChartImage,
//           "PNG",
//           10,
//           tableHeight + 10,
//           190,
//           chartHeight
//         );
//         doc.addPage();
//         doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
//       } else {
//         // Not enough space for any chart on the current page
//         doc.addPage();
//         doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
//         doc.addImage(
//           lineChartImage,
//           "PNG",
//           10,
//           20 + chartHeight,
//           190,
//           chartHeight
//         );
//       }
//     } else if (barChartImage) {
//       // Only the bar chart is available
//       if (remainingSpace >= chartHeight) {
//         doc.addImage(
//           barChartImage,
//           "PNG",
//           10,
//           tableHeight + 10,
//           190,
//           chartHeight
//         );
//       } else {
//         doc.addPage();
//         doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
//       }
//     } else if (lineChartImage) {
//       // Only the line chart is available
//       if (remainingSpace >= chartHeight) {
//         doc.addImage(
//           lineChartImage,
//           "PNG",
//           10,
//           tableHeight + 10,
//           190,
//           chartHeight
//         );
//       } else {
//         doc.addPage();
//         doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
//       }
//     }

//     // Save the PDF
//     doc.save("report.pdf");
//   }

//   return (
//     <>
//       <div
//         className="container shadow col-10 justify-center p-3 mb-5 rounded"
//         style={{ backgroundColor: "#D9D9D9" }}
//       >
//         <div className="row">
//           <div className="clo-lg-8 col-12 col-md-6">
//             {/* Vehicle type radio buttons */}
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="radioOptions"
//                 id="radioOptionAll"
//                 value=""
//                 checked={selectedVehicleType === ""}
//                 onChange={handleVehicleTypeChange}
//               />
//               <label className="form-check-label" htmlFor="radioOptionAll">
//                 All
//               </label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="radioOptions"
//                 id="radioOption1"
//                 value="Bus"
//                 checked={selectedVehicleType === "Bus"}
//                 onChange={handleVehicleTypeChange}
//               />
//               <label className="form-check-label" htmlFor="radioOption1">
//                 Bus
//               </label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="radioOptions"
//                 id="radioOption2"
//                 value="Train"
//                 checked={selectedVehicleType === "Train"}
//                 onChange={handleVehicleTypeChange}
//               />
//               <label className="form-check-label" htmlFor="radioOption2">
//                 Train
//               </label>
//             </div>
//           </div>
//           <div className="col-lg-3 col-12 col-md-6">
//             {/* Search input */}
//             <input
//               type="text"
//               placeholder="Search Vehicle rate"
//               name="VehicleNo"
//               id="VehicleNo"
//               className="form-control border rounded-5"
//               value={searchQuery} //serchByRate
//               onChange={handleSearchInputChange}
//             />
//           </div>
//           <div className="col-lg-3 col-12 col-md-6">
//             {/* Date filter select */}
//             <select
//               value={selectedDateFilter}
//               onChange={handleDateFilterChange}
//             >
//               <option value="">Select Date Filter</option>
//               <option value="CurrentDate">Current Date</option>
//               <option value="CurrentMonth">Current Month</option>
//               <option value="Last3Months">Last 3 Months</option>
//               <option value="CurrentYear">Current Year</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mt-3 table-responsive table-container">
//           {/* Table */}
//           <table>
//             <thead>
//               <tr>
//                 <th>Vehicle Owner</th>
//                 <th>Vehicle No</th>
//                 <th>Income</th>
//                 <th>No of Passengers</th>
//                 <th>Predicted Income</th>
//                 <th>Rate</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((vehicle) => (
//                 <tr key={vehicle.id}>
//                   <td>{vehicle.vehicleOwner}</td>
//                   <td>{vehicle.vehicleNo}</td>
//                   <td>{vehicle.income}</td>
//                   <td>{vehicle.totalPassengers}</td>
//                   <td>{vehicle.predictedIncome}</td>
//                   <td>{vehicle.rate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* bar chart & line charts*/}
//       <div
//         className="container shadow col-10 justify-center p-3 mb-5 rounded "
//         style={{ backgroundColor: "#FFFFFF" }}
//         ref={barChartRef}
//       >
//         <div className="container-fluid">
//           <Bar
//             data={barChartData}
//             options={{
//               responsive: true,
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: "Vehicle Owner",
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: "Rate",
//                   },
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>

//       <div
//         className="container shadow col-10 justify-center p-3 mb-5 rounded "
//         style={{ backgroundColor: "#FFFFFF" }}
//         ref={lineChartRef}
//       >
//         <div className="container-fluid">
//           <Line
//             data={lineChartData}
//             options={{
//               responsive: true,
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: "Vehicle Owner",
//                   },
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: "Income",
//                   },
//                   min: 0,
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>

//       <div className="row mt-3 p-5 d-flex justify-content-center align-items-center">
//         <button
//           onClick={downloadPDF}
//           className="btn btn-primary px-3 custom-button"
//         >
//           Download as PDF
//         </button>
//       </div>
//     </>
//   );
// };

// export default ReportAnlysis;
