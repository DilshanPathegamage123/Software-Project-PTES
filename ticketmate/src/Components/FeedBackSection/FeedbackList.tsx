import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem";
import FeedBackModal from "./FeedBackModal";
import FeedbackForm from "./FeedbackForm";
import "./Style.css";

interface FeedbackListProps {
  passengerId: string;
  busId: number;
  bookingId: number;
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

const FeedbackList: React.FC<FeedbackListProps> = ({
  passengerId,
  busId,
  bookingId,
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [editFeedback, setEditFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", {
          passengerId,
          busId,
          bookingId,
        });

        const response = await axios.get(
          `https://localhost:7048/api/GetBusFeedBackOperations`,
          {
            params: { passengerId, busId, bookingId },
          }
        );

        console.log("API response:", response.data);

        const feedbackArray = response.data.$values || [];
        setFeedback(feedbackArray);
        console.log("Fetched feedback:", feedbackArray);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        //setIsLoading(false);
      }
    };

    if (passengerId && busId && bookingId) {
      fetchData();
    }
  }, [passengerId, busId, bookingId]);

  const handleDeleteFeedback = (id: number) => {
    setFeedback(feedback.filter((feedback) => feedback.feedBackId !== id));
  };

  const handleEditFeedback = (item: Feedback) => {
    setEditFeedback(item);
  };

  const handleSaveFeedback = (item: Feedback) => {
    if (editFeedback) {
      setFeedback(
        feedback.map((fb) => (fb.feedBackId === item.feedBackId ? item : fb))
      );
      setEditFeedback(null);
    } else {
      setFeedback([...feedback, item]);
    }
  };

  console.log("FeedBack", feedback);

  const hasFeedback = feedback.length > 0;
  sessionStorage.setItem("hasFeedback", JSON.stringify(hasFeedback));

  console.log("FeedBack", hasFeedback);
  return (
    <div className="feedback-list rounded-2">
      {feedback.length === 0 ? (
        <p className="text-center pt-2">No Feedback Yet from you.</p>
      ) : (
        feedback.map((item) => (
          <FeedbackItem
            key={item.feedBackId}
            item={item}
            onDelete={handleDeleteFeedback}
            onEdit={handleEditFeedback}
          />
        ))
      )}
      {editFeedback && (
        <FeedBackModal onClose={() => setEditFeedback(null)}>
          <FeedbackForm
            passengerId={passengerId}
            busId={busId}
            bookingId={bookingId}
            feedback={editFeedback}
            onClose={() => setEditFeedback(null)}
            onSave={handleSaveFeedback}
          />
        </FeedBackModal>
      )}
    </div>
  );
};

export default FeedbackList;
