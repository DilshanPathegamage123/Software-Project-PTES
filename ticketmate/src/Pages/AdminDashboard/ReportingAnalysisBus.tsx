
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ReportingAnalysis.css";
import TrainOwners from "./ReportingAnalysisTrain";

import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

interface ReportData {
  vehicleOwner: string;
  totalPassengers: number;
  totalIncome: number;
  averageRate: number;
  monthlyTotalPredictedIncome: number; 
}

const ReportTable: React.FC = () => {
  const [reportType, setReportType] = useState<string>("monthly");
  const [busOwners, setBusOwners] = useState<string[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("Bus");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");


  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  // Fetch all bus owners when component mounts

  useEffect(() => {
    // Set the current date when the component mounts
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/AdminReport/busowners")
      .then((response) => {
        console.log("Bus Owners:", response.data);
        // Extract the user IDs from the response
        const ownerIds = response.data.$values;
        setBusOwners(ownerIds);
      })
      .catch((error) => {
        console.error("There was an error fetching the bus owners!", error);
      });
  }, []);

  // Fetch report data whenever reportType changes
  useEffect(() => {
    if (vehicleType === "Bus") {
      const fetchReportData = async () => {
        setLoading(true);
        let allData: ReportData[] = [];
        for (const ownerId of busOwners) {
          let data: ReportData | undefined;
          if (reportType === "daily") {
            data = await fetchDailyStatistics(ownerId);
          } else if (reportType === "monthly") {
            data = await fetchMonthlyStatistics(ownerId);
          } else if (reportType === "3months") {
            data = await fetchThreeMonthsStatistics(ownerId);
          } else if (reportType === "yearly") {
            data = await fetchYearlyStatistics(ownerId);
          }
          if (data) {
            allData.push(data);
          }
        }
        console.log("Fetched Report Data:", allData);
        setReportData(allData);
        setLoading(false);
      };

      if (busOwners.length > 0) {
        fetchReportData();
      }
    }
    // handleSearchInputChange;
  }, [reportType, busOwners, searchTerm, vehicleType]);
  

  // Functions to fetch statistics for each date filter
  const fetchDailyStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(
      `http://localhost:5050/api/AdminReport/daily/${userId}`
    );
    return mapResponseToReportData(response.data);
  };

  const fetchMonthlyStatistics = async (
    userId: string
  ): Promise<ReportData> => {
    const response = await axios.get(
      `http://localhost:5050/api/AdminReport/monthly/${userId}`
    );
    return mapResponseToReportData(response.data);
  };

  const fetchThreeMonthsStatistics = async (
    userId: string
  ): Promise<ReportData> => {
    const response = await axios.get(
      `http://localhost:5050/api/AdminReport/3months/${userId}`
    );
    return mapResponseToReportData(response.data);
  };

  const fetchYearlyStatistics = async (userId: string): Promise<ReportData> => {
    const response = await axios.get(
      `http://localhost:5050/api/AdminReport/yearly/${userId}`
    );
    return mapResponseToReportData(response.data);
  };

  const mapResponseToReportData = (data: any): ReportData => {
    return {
      vehicleOwner: data.vehicleOwner,
      totalPassengers: data.totalPassengers,
      totalIncome: data.totalIncome,
      averageRate: data.averageRate,
      monthlyTotalPredictedIncome: data.monthlyTotalPredictedIncome,
    };
  };

  function handleDateFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setReportType(event.target.value);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleVehicleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setVehicleType(event.target.value);
  }

  const filteredReportData = reportData.filter((data) =>
    data.vehicleOwner.includes(searchTerm)
  );

  const barChartData = {
    labels: filteredReportData.map((data) => data.vehicleOwner),
    datasets: [
      {
        label: "Rate",
        data: filteredReportData.map((data) => data.averageRate),
        backgroundColor: "rgba(82, 208, 146, 01)",// yellow "rgba(0, 128, 0, .8)",green
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: filteredReportData.map((data) => data.vehicleOwner),
    datasets: [
      {
        label: "Income",
        data: filteredReportData.map((data) => data.totalIncome),
        borderColor: "rgba(255, 99, 132, 1)", // red color
        borderWidth: 5, // Increase the border width for a thicker line
        tension: 0, // Set tension to 0 for a straight line
        fill: false,
      },  {
        label: "Monthly Predicted Income",
        data: filteredReportData.map((data) => data.monthlyTotalPredictedIncome),
        borderColor: "rgba(54, 162, 235, 1)", // Blue color
        borderWidth: 5, 
        tension: 0, 
        fill: false,
      },
    ],
    
  };
  const getReportHeading = () => {
    switch (reportType) {
      case "daily":
        return "Daily Admin Report";
      case "monthly":
        return "Monthly Admin Report";
      case "3months":
        return "Three Months Admin Report";
      case "yearly":
        return "Yearly Admin Report";
      default:
        return "Admin Report"; // Default fallback
    }
  };

  async function downloadPDF() {
    // Change the type of 'doc' to 'any'
    const doc: any = new jsPDF(); //corrected the error in line 228 the autotable error

  
    // Capture bar chart as image
    const barChartElement = barChartRef.current;
    const barChartCanvas = barChartElement?.querySelector("canvas");
    let barChartImage = "";

    if (barChartCanvas instanceof HTMLCanvasElement) {
      barChartImage = await html2canvas(barChartCanvas).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }
    const lineChartElement = lineChartRef.current;
    const lineChartCanvas = lineChartElement?.querySelector("canvas");
    let lineChartImage = "";

    if (lineChartCanvas instanceof HTMLCanvasElement) {
      lineChartImage = await html2canvas(lineChartCanvas).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }

    // Add the table to the PDF first
    autoTable(doc, {
      head: [
        [
          "Vehicle Owner",
          "Total Passengers",
          "Average Rate",
          "Total Income",
          "Monthly PredictedIncome",
        ],
      ],
      body: filteredReportData.map((data) => [
        data.vehicleOwner,
        data.totalPassengers,
        data.averageRate,
        data.totalIncome,
        data.monthlyTotalPredictedIncome
        
      ]),
     
      startY: 30, // Start the table below the date
    margin: { left: 14 }, // Align with the date
    styles: { halign: 'center' }, // Center align the table content

    didDrawPage: function (data) {
      doc.setFontSize(8);
      doc.text(getReportHeading(), 14, 15);

// Add the current date at the top
doc.text(`Date: ${currentDate}`, 14, 20);

// Reset the font size for the table
doc.setFontSize(12);
  const pageCount = doc.internal.getNumberOfPages(); // Get total page count
  const pageNumber = data.pageNumber; // Get current page number
  doc.setFontSize(8);
  // Add page number at the bottom right corner
  doc.text(`Page ${pageNumber} of ${pageCount}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
  doc.setFontSize(12);   
}

    });

    // Get the current height of the document
    const tableHeight = doc.autoTable.previous.finalY;

    // Determine if there's enough space for both charts on the same page
    const chartHeight = 80; // Height of each chart
    const remainingSpace = doc.internal.pageSize.getHeight() - tableHeight;

    // Add the charts to the PDF
    if (barChartImage && lineChartImage) {
      if (remainingSpace >= 2 * chartHeight) {
        // Enough space for both charts on the same page
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          tableHeight + chartHeight + 20,
          190,
          chartHeight
        );
      } else if (remainingSpace >= chartHeight) {
        // Enough space for one chart on the current page
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
        doc.addPage();
        doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
      } else {
        // Not enough space for any chart on the current page
        doc.addPage();
        doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          20 + chartHeight,
          190,
          chartHeight
        );
      }
    } else if (barChartImage) {
      // Only the bar chart is available
      if (remainingSpace >= chartHeight) {
        doc.addImage(
          barChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
      } else {
        doc.addPage();
        doc.addImage(barChartImage, "PNG", 10, 10, 190, chartHeight);
      }
    } else if (lineChartImage) {
      // Only the line chart is available
      if (remainingSpace >= chartHeight) {
        doc.addImage(
          lineChartImage,
          "PNG",
          10,
          tableHeight + 10,
          190,
          chartHeight
        );
      } else {
        doc.addPage();
        doc.addImage(lineChartImage, "PNG", 10, 10, 190, chartHeight);
      }
    }

    // Save the PDF
    doc.save("AdminBusReport.pdf");
  }

  return (
    <>
      <div>
        <div
          className="container shadow col-10 justify-center p-3  rounded-top"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <div className="row">
            <div className="clo-lg-8 col-12 col-md-6 p-1">
              {/* Vehicle type radio buttons */}

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOptions"
                  id="radioOption1"
                  value="Bus"
                  checked={vehicleType === "Bus"}
                  onChange={handleVehicleTypeChange}
                />
                <label className="form-check-label" htmlFor="radioOption1">
                  Bus
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOptions"
                  id="radioOption2"
                  value="Train"
                  checked={vehicleType === "Train"}
                  onChange={handleVehicleTypeChange}
                />
                <label className="form-check-label" htmlFor="radioOption2">
                  Train
                </label>
              </div>
            </div>
            {vehicleType === "Bus" && (
              <>
              <div  className="row">
                <div className="col-lg-3 col-12 col-md-6 ml-auto">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search Bus Owner ID"
                    name="search"
                    id="search"
                    className="form-control border rounded-5"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-lg-3 col-12 col-md-6">
                  {/* Date filter select */}
                  <select value={reportType} onChange={handleDateFilterChange}>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="3months">Three Months</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                </div>
              </>
            )}
          </div>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : vehicleType === "Bus" ? (
          <>
            <div
              className="container  col-10 justify-center p-3 mt-0 mb-5 rounded-bottom bottom-shadow"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <div className="row  ml-2 mt-3 table-responsive table-container">
                {/* Table */}
                <table>
                  <thead>
                    <tr>
                      <th className="text-center">Vehicle Owner</th>
                      <th className="text-center">Total Passengers</th>
                      <th className="text-center">Average Rate</th>
                      <th className="text-center">Total Income</th>
                      <th className="text-center">Monthly Predicted Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReportData.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{data.vehicleOwner}</td>
                        <td className="text-center">{data.totalPassengers}</td>
                        <td className="text-center">{data.averageRate}</td>
                        <td className="text-center">{data.totalIncome}</td>
                        <td className="text-center">{(data.monthlyTotalPredictedIncome)}</td> {/*.toFixed(0) */}

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts */}
            <div
              className="container shadow col-10 justify-center p-3 mb-5 rounded "
              style={{ backgroundColor: "#FFFFFF" }}
              ref={barChartRef}
            >
              <div className="container-fluid">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Vehicle Owner",
                          font: {
                            weight: 'bold'
                          }
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Rate",
                          font: {
                            weight: 'bold'
                          }
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div
              className="container shadow col-10 justify-center p-3 mb-5 rounded "
              style={{ backgroundColor: "#FFFFFF" }}
              ref={lineChartRef}
            >
              <div className="container-fluid">
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Vehicle Owner",
                          font: {
                            weight: 'bold'
                          }
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Income",
                          font: {
                            weight: 'bold'
                          }
                        },
                        min: 0,
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="row mt-3 p-5 d-flex justify-content-center align-items-center">
              <button
                onClick={downloadPDF}
                className="btn btn-primary px-3 custom-button"
              >
                Download as PDF
              </button>
            </div>
          </>
        ) : (
          <TrainOwners  showHeading={false}/>
        )}
      </div>
    </>
  );
};

export default ReportTable;
