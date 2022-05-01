import React from "react";
import styled from "styled-components";

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return (
    <HeaderWrapper id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={onBack} id="backButton">
          Föregående
        </button>
        <button onClick={onNext} id="nextButton">
          Nästa
        </button>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header `
  padding: 10px;
  color: #d36c6c;
  font-size: 26px;
  font-family: sans-serif;
  display: flex;
  justify-content: space-between;

  button {
  background-color:#92a1d1;
}
`
