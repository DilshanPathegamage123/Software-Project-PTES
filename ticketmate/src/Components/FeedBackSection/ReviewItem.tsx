import React, { useEffect, useState } from "react";
import Card from "./Card";
import Icon from "./FeedBackAssests/profile.png";
import Star from "./FeedBackAssests/star.png";
import axios from "axios";

export interface Feedback {
  feedBackId: number;
  busId?: number;
  trainScheduleId?: number;
  trainName? : string;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}


interface ReviewItemProps {
  item: Feedback;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ item }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7048/api/GetUserName`,
          {
            params: { UserId: item.passengerId },
          }
        );

        console.log("API response:", response.data);

        // Check if the response has values and if the array has at least one element
        if (response.data.$values && response.data.$values.length > 0) {
          setUsername(response.data.$values[0].userName); // Adjust according to the actual response structure
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [item.passengerId]);

  console.log(item);
  console.log(username);

  return (
    < div className="Card p-3" >
      {/* <div className="num-display ">{item.rate}</div> */}
      <div className="reviewItem h-auto">
        <div className="profile d-flex mt-0 pt-0">
          <img src={Icon} alt="profile" />
          <div className="Username mt-auto mb-auto fw-bold">{username}</div>

          <div className="rate mt-auto mb-auto me-2 ms-auto ">
            {item.rate.toFixed(1)}
          </div>
          <img
            src={Star}
            alt="rate"
            className="Star align-content-end justify-content-end  mt-auto mb-auto"
          />
        </div>

        <div className="text-display justify-content-center align-items-center d-flex">
          {item.feedBack}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
