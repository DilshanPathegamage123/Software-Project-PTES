import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./BusOwnerPageReport.css";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import Swal from 'sweetalert2';


interface BusOwnerPageReportProps {
  userId: string;
}


interface ReportData {
    $id: string;
    busId: number;
    vehicleOwner: string;
    vehicleNo: string;
    totalIncome: number;
    totalPassengers: number;
    date: string;
    averageRate: number;
    monthlyPredictedIncome: number; 

  }


const ReportTable: React.FC<BusOwnerPageReportProps> = ({ userId })=>{
    const [reportType, setReportType] = useState<string>("monthly");
    // const [userId, setUserId] = useState<string>("");
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [currentDate, setCurrentDate] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState('');



  
    const barChartRef = useRef<HTMLDivElement>(null);
    const lineChartRef = useRef<HTMLDivElement>(null);

  
    
  useEffect(() => {
    // Set the current date when the component mounts
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);




useEffect(() => {
  const fetchReportData = async () => {
    if (!userId) return;
    // setErrorMessage('');
    setLoading(true);

    // Swal.fire({
    //   title: 'Loading...',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    try {
      let data: ReportData[] = [];

      switch (reportType) {
        case "daily":
          data = await fetchDailyStatistics(userId);
          break;
        case "monthly":
          data = await fetchMonthlyStatistics(userId);
          break;
        case "3months":
          data = await fetchThreeMonthsStatistics(userId);
          break;
        case "yearly":
          data = await fetchYearlyStatistics(userId);
          break;
        default:
          data = [];
      }

      setReportData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setErrorMessage('Error fetching data. Please try again later.');
      setReportData([]);
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  fetchReportData();
}, [reportType, userId]);




  const fetchDailyStatistics = async (userId: string): Promise<ReportData[]> => {
    const response = await axios.get(
      `http://localhost:5050/api/BusOwnerReports/GetOwnerReport/${userId}`
    );
    return response.data.$values.map(mapResponseToReportData);
  };

  const fetchMonthlyStatistics = async (userId: string): Promise<ReportData[]> => {
    const response = await axios.get(
      `http://localhost:5050/api/BusOwnerReports/GetMonthlyOwnerReport/${userId}`
    );
    return response.data.$values.map(mapResponseToReportData);
  };

  const fetchThreeMonthsStatistics = async (userId: string): Promise<ReportData[]> => {
    const response = await axios.get(
      `http://localhost:5050/api/BusOwnerReports/GetQuarterlyOwnerReport/${userId}`
    );
    return response.data.$values.map(mapResponseToReportData);
  };

  const fetchYearlyStatistics = async (userId: string): Promise<ReportData[]> => {
    const response = await axios.get(
      `http://localhost:5050/api/BusOwnerReports/GetYearlyOwnerReport/${userId}`
    );
    return response.data.$values.map(mapResponseToReportData);
  };

  const mapResponseToReportData = (data: any): ReportData => {
    return {
      $id: data.$id,
      busId: data.busId,
      vehicleOwner: data.vehicleOwner,
      vehicleNo: data.vehicleNo,
      totalPassengers: data.totalPassengers,
      totalIncome: data.totalIncome,
      averageRate: data.averageRate,
      date: data.date,
      monthlyPredictedIncome: data.monthlyPredictedIncome,
    };
  };


  const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(event.target.value);
  };

  // const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserId(event.target.value);
  // };


  const barChartData = {
    labels: reportData.map((data) => data.vehicleNo),
    datasets: [
      {
        label: "No of Passengers",
        data: reportData.map((data) => data.totalPassengers),
        backgroundColor: "rgba(82, 208, 146, 01)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: reportData.map((data) => data.vehicleNo),
    datasets: [
      {
        label: "Income",
        data: reportData.map((data) => data.totalIncome),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth:6,
        fill: false,
      },{
        label: "Monthly Predicted Income",
        data: reportData.map((data) => Math.max(0,Math.round(data.monthlyPredictedIncome))),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth:6,
        fill: false,
      },
    ],
  };

  const downloadPDF = async () => {
    const doc: any = new jsPDF();

   
    const barChartElement = barChartRef.current;
    const barChartCanvas = barChartElement?.querySelector("canvas");
    let barChartImage = "";

    if (barChartCanvas instanceof HTMLCanvasElement) {
      barChartImage = await html2canvas(barChartCanvas, { scale: 4 }).then((canvas) =>
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

    const getReportHeading = () => {
      switch (reportType) {
        case "daily":
          return "Daily Report ";
        case "monthly":
          return "Monthly Report";
        case "3months":
          return "Three Months Report";
        case "yearly":
          return "Yearly Report";
        default:
          return "Bus Report"; // Default fallback
      }
    };

    autoTable(doc, {
      head: [
        [
          "Vehicle number",
          "Total Passengers",
          "Average Rate",
          "Total Income",
          "Monthly PredictedIncome",
        ],
      ],
      body: reportData.map((data) => [
        data.vehicleNo,
        data.totalPassengers,
        (data.averageRate.toFixed(1)),
        Math.round(data.totalIncome),
        Math.max(0,Math.round(data.monthlyPredictedIncome))
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
    doc.text(`Page ${pageNumber} of ${pageCount}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 2);
    doc.setFontSize(12);   
  }
    });

    const tableHeight = doc.autoTable.previous.finalY;
    const chartHeight = 80;
    const remainingSpace = doc.internal.pageSize.getHeight() - tableHeight;

    if (barChartImage && lineChartImage) {
      if (remainingSpace >= 2 * chartHeight) {
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

    doc.save(`BusReport_${currentDate}.pdf`);
  };

  return (
    <>
      <div>
        <div
          className="container shadow col-10 justify-center p-3 rounded-top"
          style={{ backgroundColor: "#D9D9D9" }}
        >
          <div className="row">
            <h6>Bus Owner Report</h6>
            {/* <div className="col-lg-4 col-12 col-md-6 ml-auto">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                className="form-control"
                value={userId}
                onChange={handleUserIdChange}
              />
            </div> */}
            {/* <div className="col-lg-3 col-12 col-md-6 ml-auto"> */}
                  {/* Search input */}
                  {/* <input
                    type="text"
                    placeholder="Search Bus Owner ID"
                    name="search"
                    id="search"
                    className="form-control border rounded-5"
                    value={userId}
                    onChange={handleUserIdChange}
                  />
                </div> */}
            <div className="col-lg-4 col-12 col-md-6 ml-auto">
              {/* <label htmlFor="reportType">Report Type:</label> */}
              <select
                id="reportType"
                // className="form-control"
                value={reportType}
                onChange={handleDateFilterChange}
              >
               <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="3months">Three Months</option>
                    <option value="yearly">Yearly</option>
              </select>
            </div>
            
          </div>
        </div>
        {loading ? (
           <div>Loading...</div>
          // <div
          //   className="d-flex justify-content-center align-items-center"
          //   style={{ minHeight: "200px" }}
          // >
          //   <div className="spinner-border" role="status">
          //     <span className="visually-hidden">Loading...</span>
          //   </div>
          // </div>
        ) : errorMessage ?(
            <div className="d-flex justify-content-center">

            <div className="alert alert-danger" role="alert" style={{ width: '50%' }}>
          {errorMessage}
          </div>
        </div>
      ) : (
          <>
            <div
              className="container col-10 justify-center p-3 mt-0 mb-5 rounded-bottom bottom-shadow"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <div className="row ml-2 mt-3 table-responsive table-container">
                <table>
                  <thead>
                    <tr>
                    <th className="text-center">Vehicle No</th>
                    <th className="text-center">Total Passengers</th>
                    <th className="text-center">Average Rate</th>
                    <th className="text-center">Total Income</th>
                    <th className="text-center">Monthly Predicted Income</th>
                    </tr>
                  </thead>
                  <tbody>
                     {reportData.map((data) => (
              <tr key={data.$id}>
                        <td className="text-center">{data.vehicleNo}</td>
                        <td className="text-center">{data.totalPassengers}</td>
                        <td className="text-center">{(data.averageRate.toFixed(1))}</td>
                        <td className="text-center">{Math.round(data.totalIncome)}</td>
                        <td className="text-center">{Math.max(0,Math.round(data.monthlyPredictedIncome))}</td> {/*.toFixed(0) */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="container shadow col-10 justify-center p-3 mt-0 mb-5 rounded-bottom" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="chart-container" ref={barChartRef}>
                <Bar data={barChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,

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
                        text: "No of Passengers",
                        font: {
                          weight: 'bold'
                        }
                      },
                    },
                  },
                }} />
              </div>
            </div>
            <div className="container shadow col-10 justify-center p-3 mt-0 mb-5 rounded-bottom" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="chart-container" ref={lineChartRef}>
                <Line data={lineChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,

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
                }} />
              </div>
            </div>
          </>
        )}
      </div>
          <div className="container">
            <div className="row justify-content-center">
              <button className="btn btn-primary px-3 custom-button" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>
    </>
  );
};

export default ReportTable;
