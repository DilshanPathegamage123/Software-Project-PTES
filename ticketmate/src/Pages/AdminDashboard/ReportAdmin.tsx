import axios from "axios";
import { useState, useEffect } from "react";
import "./ReportAdmin.css";


const ReportAnlysis = () => {
  type Vehicle = {
    id: number;
    vehicleNo: string;
    vehicleOwner: string;
    income: number;
    predictedIncome: number;
    totalPassengers: number;
    rate: number;
    date: string;
  };

  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [filteredData, setFilteredData] = useState<Vehicle[]>([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [serchByRate, setSerchByRate] = useState<string>("");

  useEffect(() => {
    // Fetch vehicle data from the API
    axios
      .get("https://localhost:7257/api/Reports")
      .then((response) => {
        // Set the fetched vehicle data to the state variable vehicleData
        setVehicleData(response.data);
        // Set the filtered data to the fetched vehicle data initially
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Filter the data whenever the selected vehicle type, date filter, or search query changes
    filterData();
  }, [selectedVehicleType, selectedDateFilter, searchQuery]);//searcchByRate

  function filterData() {
    let filtered = vehicleData;

    // Filter by selected vehicle type
    if (selectedVehicleType === "Bus") {
      filtered = filtered.filter(
        (vehicle) => !vehicle.vehicleNo.includes("TRN")
      );
    } else if (selectedVehicleType === "Train") {
      filtered = filtered.filter((vehicle) =>
        vehicle.vehicleNo.includes("TRN")
      );
    }

    // Filter by selected date filter
    if (selectedDateFilter === "CurrentDate") {
      filtered = filtered.filter((vehicle) => isCurrentDate(vehicle.date));
    } else if (selectedDateFilter === "CurrentMonth") {
      filtered = filtered.filter((vehicle) => isCurrentMonth(vehicle.date));
    } else if (selectedDateFilter === "Last3Months") {
      filtered = filtered.filter((vehicle) => isLastThreeMonths(vehicle.date));
    } else if (selectedDateFilter === "CurrentYear") {
      filtered = filtered.filter((vehicle) => isCurrentYear(vehicle.date));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (vehicle) => vehicle.vehicleNo.includes(searchQuery.toUpperCase())

        // vehicle.rate.toString().includes(serchByRate.toUpperCase())
      );
    }

    // Update the filtered data state
    setFilteredData(filtered);
  }

  function isCurrentDate(date: string) {
    const currentDate = new Date().toISOString().split("T")[0];
    return date === currentDate;
  }

  function isCurrentMonth(date: string) {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return date.slice(0, 7) === currentMonth;
  }

  function isLastThreeMonths(date: string) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const threeMonthsAgo = new Date(
      currentYear,
      currentMonth - 2,
      currentDate.getDate()
    )
      .toISOString()
      .slice(0, 7);
    return date.slice(0, 7) >= threeMonthsAgo;
  }

  function isCurrentYear(date: string) {
    const currentYear = new Date().getFullYear().toString();
    return date.slice(0, 4) === currentYear;
  }

  // Event handlers
  // Handle the change event of the vehicle type radio buttons
  function handleVehicleTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedVehicleType(event.target.value);
  }

  // Handle the change event of the date filter select
  function handleDateFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDateFilter(event.target.value);
  }

  // Handle the change event of the search input
  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    // setSerchByRate(event.target.value);
  }

//add a chart to the report with x axis as vehicle number and y axis as income
// using chart.js

  // function chart() {
  //   const ctx = document.getElementById("myChart");
  //   const myChart = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //       datasets: [
  //         {
  //           label: "# of Votes",
  //           data: [12, 19, 3, 5, 2, 3],
  //           backgroundColor: [
            //   "rgba(255, 99, 132, 0.2)",
            //   "rgba(54, 162, 235, 0.2)",
            //   "rgba(255, 206, 86, 0.2)",
            //   "rgba(75, 192, 192, 0.2)",
            //   "rgba(153, 102, 255, 0.2)",
            //   "rgba(255, 159, 64, 0.2)",
            // ],
            // borderColor: [
            //   "rgba(255, 99, 132, 1)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            //   "rgba(255, 159, 64, 1)",
            // ],

  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // chart();




  return (
    <>
      <div
        className="container shadow col-10 justify-center p-3 mb-5 rounded"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="row">
          <div className="clo-lg-8 col-12 col-md-6">
            {/* Vehicle type radio buttons */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="radioOptions"
                id="radioOptionAll"
                value=""
                checked={selectedVehicleType === ""}
                onChange={handleVehicleTypeChange}
              />
              <label className="form-check-label" htmlFor="radioOptionAll">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="radioOptions"
                id="radioOption1"
                value="Bus"
                checked={selectedVehicleType === "Bus"}
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
                checked={selectedVehicleType === "Train"}
                onChange={handleVehicleTypeChange}
              />
              <label className="form-check-label" htmlFor="radioOption2">
                Train
              </label>
            </div>
          </div>
          <div className="col-lg-3 col-12 col-md-6">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search Vehicle rate"
              name="VehicleNo"
              id="VehicleNo"
              className="form-control border rounded-5"
              value={searchQuery} //serchByRate
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="col-lg-3 col-12 col-md-6">
            {/* Date filter select */}
            <select
              value={selectedDateFilter}
              onChange={handleDateFilterChange}
            >
              <option value="">Select Date Filter</option>
              <option value="CurrentDate">Current Date</option>
              <option value="CurrentMonth">Current Month</option>
              <option value="Last3Months">Last 3 Months</option>
              <option value="CurrentYear">Current Year</option>
            </select>
          </div>
        </div>
        <div className="row mt-3 table-responsive table-container">
          {/* Table */}
          <table>
            <thead>
              <tr>
                <th>Vehicle Owner</th>
                <th>Vehicle No</th>
                <th>Income</th>
                <th>No of Passengers</th>
                <th>Predicted Income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.vehicleOwner}</td>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.income}</td>
                  <td>{vehicle.totalPassengers}</td>
                  <td>{vehicle.predictedIncome}</td>
                  <td>{vehicle.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         {/* <div className="row mt-3">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>  */}
      </div>
    </>
  );
};

export default ReportAnlysis;
