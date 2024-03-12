//   //I'm hardcoding the data here. We must fetch it from an API later.
//   const data = [
//     "Colombo",
//     "Gampaha",
//     "Wattala",
//     "Negombo",
//     "Anuradhapura",
//     "Jaffna",
//     "Ja-Ela",
//     "Galle",
//   ];
import React, { useEffect, useState } from "react";
import "./EndLocationSelector.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

interface EndLocationSelectorProps {
  setSelectedEndLocation: React.Dispatch<React.SetStateAction<string>>;
}

//function EndLocationSelector() {
const EndLocationSelector: React.FC<EndLocationSelectorProps> = ({
  setSelectedEndLocation,
}) => {
  const [endvalue, setEndValue] = useState("");
  const [endData, setEndData] = useState([]);
  const [filteredEndData, setFilteredEndData] = useState([]);

  useEffect(() => {
    getAllEndLocations();
  }, []);

  const getAllEndLocations = async () => {
    try {
      const response1 = await axios.get(
        "https://localhost:7028/api/endlocation"
      );
      console.log("Response end (locations) from backend:", response1.data);
      setEndData(response1.data);
      setFilteredEndData(response1.data);
    } catch (error) {
      console.error("Error while fetching end locations from backend", error);
    }
  };

  const filterEndLocations = (input: string) => {
    const filteredLocations = endData.filter(
      (location: { stopName: string }) =>
        location.stopName &&
        location.stopName.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredEndData(filteredLocations);
  };

  return (
    <div className="selector d-flex ">
      <span className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M24.077 14.4014C22.335 14.3999 19.93 14.8974 18.938 15.3149C17.9395 15.7269 17.276 16.1414 17.069 17.1734L16.3215 22.9249V30.8464H17.609V32.0819C17.608 33.5989 19.8235 33.5989 19.8205 32.0819V30.8464H28.178V32.0819C28.1795 33.5989 30.395 33.5989 30.3995 32.0819V30.8464H31.6765V22.9249L30.929 17.1734C30.727 16.1414 30.0635 15.7269 29.071 15.3149C28.073 14.8974 25.6685 14.3999 23.9315 14.4014"
            fill="#042F40"
          />
          <path
            d="M29.289 28.3648C29.8735 28.3598 30.3495 27.8838 30.348 27.2953C30.3495 26.7103 29.8735 26.2343 29.289 26.2363C28.6995 26.2343 28.2235 26.7103 28.2195 27.2953C28.2235 27.8838 28.6995 28.3598 29.289 28.3648Z"
            fill="white"
          />
          <path
            d="M18.7201 28.3648C18.1296 28.3598 17.6541 27.8838 17.6506 27.2953C17.6541 26.7103 18.1296 26.2343 18.7201 26.2363C19.3036 26.2343 19.7796 26.7103 19.7791 27.2953C19.7796 27.8838 19.3036 28.3598 18.7201 28.3648Z"
            fill="white"
          />
          <path
            d="M23.9214 16.7885H20.8379C20.2199 16.7835 20.2199 15.8505 20.8379 15.8545H27.1604C27.7829 15.8505 27.7829 16.7835 27.1604 16.7885H23.9214Z"
            fill="white"
          />
          <path
            d="M23.9216 17.7231H19.1666C18.5086 17.7256 18.3366 18.0596 18.2526 18.5641L17.6711 22.7376C17.6221 23.1336 17.7376 23.5301 18.2941 23.5266H29.7146C30.2656 23.5301 30.3811 23.1336 30.3271 22.7376L29.7456 18.5641C29.6666 18.0596 29.4946 17.7256 28.8426 17.7231H23.9216Z"
            fill="white"
          />
          <path
            d="M39.5056 20.0583C40.1362 20.1625 40.7254 19.7264 40.8293 19.0851C40.9311 18.4437 40.5051 17.8445 39.8747 17.7381C39.2506 17.6391 38.657 18.0748 38.5574 18.7164C38.4517 19.3525 38.8773 19.9566 39.5056 20.0583Z"
            fill="#042F40"
          />
          <path
            d="M38.8104 20.4122C39.0454 20.2897 39.3257 20.2186 39.6271 20.2671C40.0146 20.3269 40.3159 20.5688 40.4895 20.8481L41.4709 22.9768L42.9581 24.0696C43.0837 24.1714 43.1555 24.3269 43.1247 24.488C43.082 24.738 42.8209 24.9062 42.5412 24.8615C42.4552 24.8505 42.387 24.8127 42.312 24.7748L40.6901 23.5834C40.6399 23.5415 40.6018 23.4906 40.5702 23.4379L40.2051 22.6403L39.5234 24.6274L41.3675 26.924C41.4088 26.9934 41.4335 27.073 41.4448 27.1516L41.78 29.7701C41.7709 29.8275 41.7767 29.8638 41.7686 29.9089C41.7063 30.2911 41.3115 30.5379 40.8908 30.4758C40.5407 30.4214 40.3005 30.1682 40.2418 29.8744L39.9247 27.4209L38.4143 25.6818L37.908 27.2147C37.8886 27.2868 37.7677 27.4325 37.7314 27.4913L35.9632 29.737C35.7907 29.9402 35.5158 30.0575 35.2183 30.0114C34.7932 29.9489 34.5036 29.5901 34.5699 29.2126C34.5878 29.1062 34.6477 28.9973 34.6984 28.9238L36.3392 26.8492L37.9536 22.1137L37.1092 22.6252L36.5459 24.3127C36.4703 24.5299 36.2317 24.6919 35.9696 24.6526C35.6854 24.6096 35.4952 24.3727 35.5382 24.1187C35.5398 24.099 35.5458 24.0795 35.5522 24.0562L36.2164 22.0895C36.2543 22.007 36.3116 21.9337 36.3919 21.8805L38.8101 20.4119L38.8104 20.4122Z"
            fill="#042F40"
          />
        </svg>
      </span>
      <input
        className=" p-sm-3 p-2 align-content-center w-100 "
        list="data"
        onChange={(e) => {
          setEndValue(e.target.value);
          filterEndLocations(e.target.value);
          setSelectedEndLocation(e.target.value);
        }}
        placeholder="To"
      />

      {/* datalist element to create a dropdown list of predefined options for an <input> field.*/}
      <datalist id="data">
        {filteredEndData.map((op: { stopName: string }, index: number) => (
          <option key={index}>{op.stopName}</option>
        ))}
      </datalist>
    </div>
  );
};

export default EndLocationSelector;
