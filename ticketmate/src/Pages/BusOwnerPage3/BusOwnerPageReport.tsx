import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./BusOwnerPageReport.css";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";


interface ReportData {
    $id: string;
    busId: number;
    vehicleOwner: string;
    vehicleNo: string;
    totalIncome: number;
    totalPassengers: number;
    date: string;
    averageRate: number;
  }


const ReportTable: React.FC = () => {
    const [reportType, setReportType] = useState<string>("daily");
    const [userId, setUserId] = useState<string>("");
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
      setErrorMessage(''); // Clear any previous error message
      setLoading(true);
  

      const timeoutId = setTimeout(() => {
        setErrorMessage('The server is not connected. Please check your connection.');
        setLoading(false);
      }, 120000); // 30 seconds

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
        clearTimeout(timeoutId); // Clear the timeout if the request is successful

        setReportData(data);
      } catch (error) {
        clearTimeout(timeoutId); // Clear the timeout if there is an error

        console.error('Error fetching data:', error);
        setErrorMessage('Error fetching data. Please try again later.');
        setReportData([]);
      } finally {
        setLoading(false);
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
    };
  };
//   const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setReportType(event.target.value);
//   };

//   const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserId(event.target.value);
//   };

  const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };


  const barChartData = {
    labels: reportData.map((data) => data.vehicleNo),
    datasets: [
      {
        label: "Rate",
        data: reportData.map((data) => data.averageRate),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        borderColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const downloadPDF = async () => {
    const doc: any = new jsPDF();

    doc.setFontSize(8);

  // Add the current date at the top
  doc.text(`Date: ${currentDate}`, 14, 20);

  // Reset the font size for the table
  doc.setFontSize(12);
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

    autoTable(doc, {
      head: [
        [
          "Vehicle number",
          "Total Passengers",
          "Average Rate",
          "Total Income",
          "Predicted Income",
        ],
      ],
      body: reportData.map((data) => [
        data.vehicleNo,
        data.totalPassengers,
        data.averageRate,
        data.totalIncome,
      ]),
      startY: 30, // Start the table below the date
      margin: { left: 14 }, // Align with the date
      styles: { halign: 'center' }, // Center align the table content
  
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

    doc.save("report.pdf");
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
            <div className="col-lg-3 col-12 col-md-6 ml-auto">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search Bus Owner ID"
                    name="search"
                    id="search"
                    className="form-control border rounded-5"
                    value={userId}
                    onChange={handleUserIdChange}
                  />
                </div>
            <div className="col-lg-4 col-12 col-md-6">
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
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
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
                    <th className="text-center">Predicted Income</th>
                    </tr>
                  </thead>
                  <tbody>
                     {reportData.map((data) => (
              <tr key={data.$id}>
                        <td className="text-center">{data.vehicleNo}</td>
                        <td className="text-center">{data.totalPassengers}</td>
                        <td className="text-center">{data.averageRate}</td>
                        <td className="text-center">{data.totalIncome}</td>
                        {/* <td className="text-center">{data.predictedIncome}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="container shadow col-10 justify-center p-3 mt-0 mb-5 rounded-bottom"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <div ref={barChartRef}>
                <Bar data={barChartData} />
              </div>
              <div ref={lineChartRef}>
                <Line data={lineChartData} />
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
