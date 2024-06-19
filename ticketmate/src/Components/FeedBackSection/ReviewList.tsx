import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  busId: number;
}

export interface Feedback {
  feedBackId: number;
  busId?: number;
  trainScheduleId?: number;
  trainName?: string;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ busId }) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", {
          busId,
        });

        const response = await axios.get(
          `https://localhost:7048/api/GetFeedbacksForBus`,
          {
            params: { busId },
          }
        );

        console.log("API response:", response.data);

        const feedbackArray = response.data.$values || [];
        setFeedback(feedbackArray);
        console.log("Fetched feedback:", feedbackArray);

        if (feedbackArray.length > 0) {
          const totalRating = feedbackArray.reduce(
            (sum: number, item: Feedback) => sum + item.rate,
            0
          );
          const avgRating = totalRating / feedbackArray.length;
          setAverageRating(avgRating);
        } else {
          setAverageRating(null);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        //setIsLoading(false);
      }
    };

    if (busId) {
      fetchData();
    }
  }, [busId]);

  console.log("FeedBack", feedback);
  console.log("AverageRating", averageRating);

  const hasFeedback = feedback.length > 0;
  sessionStorage.setItem("hasFeedback", JSON.stringify(hasFeedback));

  console.log("FeedBack", hasFeedback);
  return (
    <div
      id="carouselInterval"
      className="carousel slide col-11 m-auto justify-content-center align-items-center mt-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner col-8 pt-3 m-auto p-4">
        {feedback.length === 0 ? (
          <div className="carousel-item active mt-auto mb-auto m-auto justify-content-center align-items-center">
            <p className="mt-auto mb-auto  d-flex justify-content-center align-items-center text-light">
              No Feedbacks Yet for this vehicle...
            </p>
          </div>
        ) : (
          feedback.map((item, index) => (
            <div
              key={item.feedBackId}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="2500"
            >
              <ReviewItem item={item} />
            </div>
          ))
        )}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ReviewList;
