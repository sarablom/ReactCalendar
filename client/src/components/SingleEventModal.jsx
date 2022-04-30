import React, { useState } from "react";
import { updateEvent, deleteEvent } from "../services/eventServices";
import styled from "styled-components";

export const SingleEventModal = ({ eventId, eventText, onClose }) => {
  const [updateEventText, setUpdateEventText] = useState(eventText);

  const onUpdate = async () => {
    try {
      const updateMessage = await updateEvent(eventId, {
        title: updateEventText,
      });
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
      <DeleteEventModal>
        <div id="card-top">
          <h2>Event</h2>
          <button onClick={onClose} id="closeButton">
            X
          </button>
        </div>

        <FormWrapper onSubmit={() => onUpdate()}>
          <input
            id="eventText"
            placeholder={updateEventText}
            onChange={(e) => setUpdateEventText(e.target.value)}
          />
          <button type="submit" id="updateButton">
            Update
          </button>
        </FormWrapper>

        <ButtonWrapper>
          <button onClick={onDelete} id="deleteButton">
            Delete
          </button>
        </ButtonWrapper>
      </DeleteEventModal>

      <ModalBackdrop></ModalBackdrop>
    </>
  );
};

const DeleteEventModal = styled.div`
  display: flex;
  flex-direction: column;
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

  #card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    #closeButton {
      width: fit-content;
      min-width: fit-content;
      height: fit-content;
      background-color: black;
      padding: 5px 8px;
    }
  }
`;

const FormWrapper = styled.div`
  #eventText {
    font-size: 14px;
  }

  #updateButton {
    background-color: #92a1d1;
  }
`;

const ButtonWrapper = styled.div`
  #deleteButton {
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
