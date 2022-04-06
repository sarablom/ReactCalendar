import React, { useState, useEffect, useCallback } from "react";
import { CalendarHeader } from "./components/CalendarHeader";
import { Day } from "./components/Day";
import { NewEventModal } from "./components/NewEventModal";
import { DeleteEventModal } from "./components/DeleteEventModal";
import { useDate } from "./hooks/useDate";
import { createEvent, getAllEvents } from "./services/eventServices";

export const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const eventForDate = (date) => events.find((e) => e.date === date);

 console.log(events);

  const getEventsForDisplay = useCallback(async() => {
    const allEvents = await getAllEvents();
    setEvents(allEvents.events);
  }, [setEvents]);

  useEffect(() => {
      getEventsForDisplay();
  }, [getEventsForDisplay]);

  const createNewEvent = useCallback(async (event) => {
    await createEvent(event);
    setEvent(null);
    //setEvents([...events, newEvent]);
  }, []);

  useEffect(() => {
    if (event !== null) {
      createNewEvent()
    }
  }, [event, createNewEvent]);

  const { days, dateDisplay } = useDate(events, nav);

  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Måndag</div>
          <div>Tisdag</div>
          <div>Onsdag</div>
          <div>Torsdag</div>
          <div>Fredag</div>
          <div>Lördag</div>
          <div>Söndag</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== "padding") {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]);
            setEvent({ title, date: clicked });
            setClicked(null);
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </>
  );
};
