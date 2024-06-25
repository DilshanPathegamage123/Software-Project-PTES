import React from "react";
import {FaEdit } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Card from "./Card";
import axios from "axios";
import { toast } from "react-toastify";

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


interface FeedbackItemProps {
  item: Feedback;
  onDelete?: (id: number) => void;
  onEdit?: (item: Feedback) => void;
}

const TrainFeedbackItem: React.FC<FeedbackItemProps> = ({
  item,
  onDelete,
  onEdit,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:7048/api/DeleteTrainFeedBack/${item.feedBackId}`
      );
      if (onDelete) {
        onDelete(item.feedBackId);
      }
      console.log("FeedBack deleted successfully");
      toast.success("Your feedBack is deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback");
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <Card>
      <div className="num-display">{item.rate}</div>
      <button onClick={handleDelete} className="close">
        <MdDelete color="red" />
      </button>
      {/* <button onClick={handleEdit} className="edit">
        <FaEdit color="purple" />
      </button> */}
      <div className="text-display">{item.feedBack}</div>
    </Card>
  );
};

export default TrainFeedbackItem;
