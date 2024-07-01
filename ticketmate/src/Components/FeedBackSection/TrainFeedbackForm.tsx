import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingSelect from "./RatingSelect";
import Card from "./Card";
import "./Style.css";
import { toast } from "react-toastify";
import SendButton from "./SendButton";

export interface Feedback {
  feedBackId: number;
  busId?: number;
  trainScheduleId?: number;
  trainName?: string | null;
  bookingId: number;
  passengerId: string;
  rate: number;
  feedBack: string;
  givenDate: string;
}

type Props = {
  passengerId: string;
  trainScheduleId: number | null;
  bookingId: number;
  onClose: () => void;
  feedback?: Feedback;
  onSave: (feedback: Feedback) => void;
};

const TrainFeedbackForm: React.FC<Props> = ({
  passengerId,
  trainScheduleId,
  bookingId,
  onClose,
  feedback,
  onSave,
}) => {
  const [text, setText] = useState(feedback ? feedback.feedBack : "");
  const [rating, setRating] = useState(feedback ? feedback.rate : 10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [trainScheduleDetails, setTrainScheduleDetails] = useState<any>(null);
  const [TrainName, setTrainName] = useState("");
  // Fetch hasFeedback from session storage
  const hasFeedback = JSON.parse(
    sessionStorage.getItem("hasFeedback") || "false"
  );
  console.log(passengerId, trainScheduleId, bookingId, feedback);
  console.log("Has Feedback or not?", hasFeedback);

  useEffect(() => {
    if (text.length === 0) {
      setBtnDisabled(true);
      setMessage("");
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

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
        setTrainScheduleDetails(trainDetails);
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

  console.log("TrainScheduleDetails", trainScheduleDetails);
  console.log("Train Name", TrainName);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentRating = Number(sessionStorage.getItem("rating"));

    if (text.trim().length > 0) {
      // Check if feedback already exists
      if (!feedback && hasFeedback) {
        setMessage("You have already submitted feedback for this booking.");
        return;
      }
      console.log("Rating updated:", currentRating);
      const newFeedback: Feedback = {
        feedBackId: feedback ? feedback.feedBackId : 0,
        passengerId,
        trainScheduleId: trainScheduleId!,
        trainName: TrainName,
        bookingId,
        feedBack: text,
        rate: currentRating,
        givenDate: new Date().toISOString().split("T")[0],
      };

      console.log("Rating updated:", currentRating);
      console.log("New Feedback:", newFeedback);

      try {
        if (newFeedback) {
          await axios.post(
            "https://localhost:7048/api/SaveTrainFeedback",
            newFeedback
          );
          toast.success("Feedback submitted successfully");
          onClose();
          onSave(newFeedback);
          setText("");

          console.log("Saved Successfully");
          console.log("New FeedBack:", newFeedback);
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        console.log(error);
      }
    } else {
      console.log("Feedback should be atleast 10 characters long");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate this travel?</h2>
        <RatingSelect
          selected={rating}
          select={(rating: number) => {
            console.log("Selected rating:", rating);
            setRating(rating);
            sessionStorage.setItem("rating", rating.toString());
          }}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextChange}
          />
          <SendButton type="submit" isDisabled={btnDisabled}>
            {feedback ? "Update" : "Send"}
          </SendButton>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default TrainFeedbackForm;
