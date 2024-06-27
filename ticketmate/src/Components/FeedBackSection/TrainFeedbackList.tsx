import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem";
import FeedBackModal from "./FeedBackModal";
import TrainFeedbackForm from "./TrainFeedbackForm";
import TrainFeedbackItem from "./TrainFeedBackItem";

interface FeedbackListProps {
  passengerId: string;
  trainScheduleId: number;
  bookingId: number;
  //trainName : string;
}

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

const TrainFeedbackList: React.FC<FeedbackListProps> = ({
  passengerId,
  trainScheduleId,
  bookingId,
  //trainName,
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [editFeedback, setEditFeedback] = useState<Feedback | null>(null);
  const [trainName, setTrainName] = useState("");

  useEffect(() => {
    const fetchTrainName = async () => {
      if (!trainScheduleId) {
        console.error("Train scheduleId is undefined");
        return;
      }

      try {
        const trainSchedule = await axios.get(
          `https://localhost:7048/api/GetTrainNames`,
          {
            params: { trainScheduleId },
          }
        );
        const trainDetails = trainSchedule.data.$values[0];
        console.log(trainDetails);
        //setTrainScheduleDetails(trainDetails);
        setTrainName(trainDetails.trainName);
        
      } catch (error) {
        console.error(
          "Error fetching schedule details for get train name:",
          error
        );
      }
    };

    fetchTrainName();
  }, [trainScheduleId]);
 
  console.log(trainName);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", {
          passengerId,
          trainScheduleId,
          bookingId,
          trainName,
        });

        const response = await axios.get(
          `https://localhost:7048/api/GetTrainFeedBackOperations`,
          {
            params: { passengerId, trainName, bookingId },
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

    if (passengerId && trainName && bookingId) {
      fetchData();
    }
  }, [passengerId, trainName, bookingId]);

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
  sessionStorage.setItem('hasFeedback', JSON.stringify(hasFeedback));

  console.log("FeedBack", hasFeedback);
  return (
    <div className="feedback-list">
      {feedback.length === 0 ? (
        <p className="ps-5 ms-3">No Feedback Yet from you.</p>
      ) : (
        feedback.map((item) => (
          <TrainFeedbackItem
            key={item.feedBackId}
            item={item}
            onDelete={handleDeleteFeedback}
            onEdit={handleEditFeedback}
          />
        ))
      )}
      {editFeedback && (
        <FeedBackModal onClose={() => setEditFeedback(null)}>
          <TrainFeedbackForm
            passengerId={passengerId}
            trainScheduleId={trainScheduleId}
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

export default TrainFeedbackList;
