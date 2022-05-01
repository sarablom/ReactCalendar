import React, { useState } from "react";
import styled from "styled-components";

export const NewEventModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  return (
    <>
      <EventModalWrapper id="newEventModal">
        <h2>New Event</h2>

        <input
          className={error ? "error" : ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="eventTitleInput"
          placeholder="Event Title"
        />

        <button
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title);
            } else {
              setError(true);
            }
          }}
          id="saveButton"
        >
          Save
        </button>

        <button onClick={onClose} id="cancelButton">
          Cancel
        </button>
      </EventModalWrapper>

      <ModalBackdrop id="modalBackDrop"></ModalBackdrop>
    </>
  );
};

const EventModalWrapper = styled.div`
  z-index: 20;
  padding: 25px;
  background-color: #e8f4fa;
  box-shadow: 0px 0px 3px black;
  border-radius: 5px;
  width: 350px;
  top: 100px;
  left: calc(50% - 175px);
  position: absolute;
  font-family: sans-serif;

  input {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
    border-radius: 3px;
    outline: none;
    border: none;
    box-shadow: 0px 0px 3px gray;
  }

  .error {
    border: 2px solid red;
  }

  #saveButton {
  background-color: #92a1d1;
}

#cancelButton {
  background-color: #d36c6c;
}
`;

const ModalBackdrop = styled.div`
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
`;
