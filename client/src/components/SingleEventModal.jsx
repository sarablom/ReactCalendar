import React, { useState } from "react";
import { updateEvent, deleteEvent } from "../services/eventServices";

export const SingleEventModal = ({ eventId, eventText, onClose }) => {
  const [updateEventText, setUpdateEventText] = useState(eventText);

  const onUpdate = async () => {
    try {
      const updateMessage = await updateEvent(eventId, { title: updateEventText });
      console.log("i onUpdate updateMessage", updateMessage);
      // if (updateMessage.success) {
      // onClose();
      // window.location.reload();
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
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

        <form onSubmit={() => onUpdate()}>
          <input
            id="eventText"
            placeholder={updateEventText}
            onChange={(e) => setUpdateEventText(e.target.value)}
          />
          <button type="submit" id="updateButton">
            Update
          </button>
        </form>

        <div id="buttons">
          <button onClick={onDelete} id="deleteButton">
            Delete
          </button>
        </div>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};
