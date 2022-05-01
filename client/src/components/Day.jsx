import React from "react";
import styled from "styled-components";

export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;

  return (
    <DayWrapper onClick={onClick} className={className}>
      {day.value === "padding" ? "" : day.value}

      {day.event && (
        <EventWrapper className="event">{day.event.title}</EventWrapper>
      )}
    </DayWrapper>
  );
};

const DayWrapper = styled.div`
  cursor: default !important;
  background-color: #fffcff !important;
  box-shadow: none !important;
`;

const EventWrapper = styled.div`
  font-size: 10px;
  padding: 3px;
  background-color: #58bae4;
  color: white;
  border-radius: 5px;
  max-height: 55px;
  overflow: hidden;
`;
