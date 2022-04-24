import React from "react";
import { updateEvent, deleteEvent } from "../services/eventServices";

export const SingleEventModal = ({ eventId, eventText, onClose }) => {
  const onUpdate = () => {
    console.log("uppdatera", eventId);
  };

  const onDelete = async () => {
    await deleteEvent(eventId);
    onClose();
  };

  return (
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>
        <button onClick={onClose} id="closeButton">
          X
        </button>

        <p id="eventText">{eventText}</p>

        <button onClick={onDelete} id="deleteButton">
          Delete
        </button>

        <button onClick={onUpdate} id="updateButton">
          Update
        </button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
