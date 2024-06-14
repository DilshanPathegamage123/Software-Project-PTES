
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ReportingAnalysis.css";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

interface TrainReportItem {
  trainName: string;
  totalIncome: number;
  totalPassengers: number;
  averageRate: number;
  userId: string;
  date: string;
  scheduleIds: {
    id: string;
    values: number[];
  };
}

interface ApiResponse {
  $values: ApiResponseItem[];
}

interface ApiResponseItem {
  $id: string;
  trainName: string;
  totalIncome: number;
  totalPassengers: number;
  averageRate: number;
  userId: string;
  date: string;
  scheduleIds: {
    $id: string;
    $values: number[];
  };
}

interface MyComponentProps {
  showHeading: boolean;
  headingText?: string; // `headingText` is optional
}

const TrainReport: React.FC<MyComponentProps> = ({ showHeading, headingText }) => {
  const [dateFilter, setDateFilter] = useState<number>(3); // Default to 'daily' (0)
  const [report, setReport] = useState<TrainReportItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  // const [vehicleType, setVehicleType] = useState<string>("Train");
  const [searchTerm, setSearchTerm] = useState<string>("");


  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Set the current date when the component mounts
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);


  const mapResponseToTrainReportItem = (data: ApiResponse): TrainReportItem[] => {
    return data.$values.map((item: ApiResponseItem) => ({
      trainName: item.trainName,
      totalIncome: item.totalIncome,
      totalPassengers: item.totalPassengers,
      averageRate: item.averageRate,
      userId: item.userId,
      date: item.date,
      scheduleIds: {
        id: item.scheduleIds.$id,
        values: item.scheduleIds.$values,
      },
    }));
  };

  async function fetchTrainReport(dateFilter: number): Promise<TrainReportItem[]> {
    const userId = 48; // Set the constant user ID
    try {
      const response = await axios.get<ApiResponse>(`http://localhost:5050/api/TrainReports/${userId}/${dateFilter}`);
      // Ensure the response has the $values property
      if (response.data && response.data.$values) {
        return mapResponseToTrainReportItem(response.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching train report:', error);
      throw new Error('Failed to fetch train report');
    }
  }

  useEffect(() => {
    const getReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrainReport(dateFilter);
        setReport(data);
      } catch (err) {
        setError("Failed to fetch train report");
      } finally {
        setLoading(false);
      }
    };

    getReport();
  }, [dateFilter]);

  const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(parseInt(event.target.value, 10));
  };
  // function handleVehicleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   setVehicleType(event.target.value);
  // }
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value.toLowerCase());
  }
  const filteredReportData = report.filter((data) =>
    data.trainName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const barChartData = {
    labels: filteredReportData.map((data) => data.trainName),
    datasets: [
      {
        label: "Rate",
        data: filteredReportData.map((data) => data.averageRate),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: filteredReportData.map((data) => data.trainName),
    datasets: [
      {
        label: "Income",
        data: filteredReportData.map((data) => data.totalIncome),
        borderColor: "rgba(75, 192, 192, 0.6)", // Aqua color
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  async function downloadPDF() {
    // Change the type of 'doc' to 'any'
    const doc: any = new jsPDF(); //corrected the error in line 228 the autotable error

  
    const barChartElement = barChartRef.current;
    const barChartCanvas = barChartElement?.querySelector("canvas");
    let barChartImage = "";

    if (barChartCanvas instanceof HTMLCanvasElement) {
      barChartImage = await html2canvas(barChartCanvas,{scale:4}).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }
    const lineChartElement = lineChartRef.current;
    const lineChartCanvas = lineChartElement?.querySelector("canvas");
    let lineChartImage = "";

    if (lineChartCanvas instanceof HTMLCanvasElement) {
      lineChartImage = await html2canvas(lineChartCanvas,{scale:4}).then((canvas) =>
        canvas.toDataURL("image/png")
      );
    }

    // Add the table to the PDF first
    autoTable(doc, {
      head: [
        [
          "Train Name",
          "Schedule Ids",
          "Total Passengers",
          "Average Rate",
          "Total Income",
          "Predicted Income",
        ],
      ],
      body: filteredReportData.map((data) => [
        data.trainName,
        data.scheduleIds.values.join(', '), // Convert the scheduleIds object to a string
        data.totalPassengers,
        data.averageRate,
        data.totalIncome,
        // data.predictedincome
      ]),
     
      startY: 30, // Start the table below the date
    margin: { left: 14 }, // Align with the date
    styles: { halign: 'center' }, // Center align the table content

    didDrawPage: function (data) {
      doc.setFontSize(8);

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
    doc.save("AdimnTraineReport.pdf");
  }


  return (

<>
      <div>
        <div
          className="container  col-10 justify-center p-3  "
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <div className="row">
          
              <>
              {showHeading && <h6>{headingText}</h6>}
                <div className="col-lg-3 col-12 col-md-6 ml-auto">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search Train Name"
                    name="search"
                    id="search"
                    className="form-control border rounded-5"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-lg-3 col-12 col-md-6">
                  {/* Date filter select */}
                  <select
                        id="reportType"
                        value={dateFilter}
                        onChange={handleDateFilterChange}
                      >
                        <option value={0}>Daily</option>
                        <option value={1}>Monthly</option>
                        <option value={2}>Three Months</option>
                        <option value={3}>Yearly</option>
                      </select>
                </div>
              </>
            
          </div>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) :  (
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
                    <th className="text-center">Train Name</th>
                    <th className="text-center">Schedule IDs</th>
                    <th className="text-center">Total Passengers</th>
                    <th className="text-center">Average Rate</th>
                    <th className="text-center">Total Income</th>
                    <th className="text-center">Predicted Income</th>
                  </tr>
                  </thead>
                  <tbody>
                      {filteredReportData.map((item) => (
                        <tr key={item.trainName}>
                          <td className="text-center">{item.trainName}</td>
                          <td className="text-center">{item.scheduleIds.values.join(', ')}</td>
                          <td className="text-center">{item.totalPassengers}</td>
                          <td className="text-center">{item.averageRate.toFixed(1)}</td>
                          <td className="text-center">{item.totalIncome}</td>
                          <td className="text-center">{(item.totalIncome * 1.1).toFixed(0)}</td> {/* .toFixed(2) */}
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
                          text: "Train Name",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Rate",
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
                          text: "Train Name",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Income",
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
       
          
        )}
      </div>
    </>
  );
};

export default TrainReport;