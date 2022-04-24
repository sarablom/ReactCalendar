import React from "react";
import { updateEvent, deleteEvent } from "../services/eventServices";

export const SingleEventModal = ({ eventId, eventText, onClose }) => {
  const onUpdate = () => {
    console.log("uppdatera", eventId);
  };

  const onDelete = async () => {
    try {
      console.log("delete", eventId);
      const deleteMessage = await deleteEvent(eventId);
      if (deleteMessage.success) {
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id="deleteEventModal">
        <div id="card-top">
          <h2>Event</h2>
          <button onClick={onClose} id="closeButton">
            X
          </button>
        </div>

        <p id="eventText">{eventText}</p>

        <div id="buttons">
          <button onClick={onDelete} id="deleteButton">
            Delete
          </button>

          <button onClick={onUpdate} id="updateButton">
            Update
          </button>
        </div>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
