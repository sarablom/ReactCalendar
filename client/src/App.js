import React, { useState, useEffect, useCallback } from "react";
import { CalendarHeader } from "./components/CalendarHeader";
import { Day } from "./components/Day";
import { NewEventModal } from "./components/NewEventModal";
import { SingleEventModal } from "./components/SingleEventModal";
import { useDate } from "./hooks/useDate";
import { createEvent, getAllEvents } from "./services/eventServices";

export const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const { days, dateDisplay } = useDate(events, nav);

  const getEventsForDisplay = useCallback(async () => {
    try {
      const allEvents = await getAllEvents();
      if (allEvents?.events) {
        allEvents.events.map((event) => {
          const day = new Date(event.date).getDate();
          const month = new Date(event.date).getMonth() + 1;
          const year = new Date(event.date).getFullYear();

          const dayString = `${month}/${day}/${year}`;
          return (event.date = dayString);
        });
        setEvents(allEvents.events);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setEvents]);

  useEffect(() => {
    getEventsForDisplay();
  }, [getEventsForDisplay]);

  const eventForDate = (date) => events.find((e) => e.date === date);

  const createNewEvent = useCallback(
    async (event) => {
      try {
        const newEvent = await createEvent(event);
        setEvent(null);
        setEvents([...events, newEvent.event]);
      } catch (err) {
        console.log(err);
      }
    },
    [events]
  );

  useEffect(() => {
    if (event !== null) {
      createNewEvent(event);
    }
  }, [event, createNewEvent]);

  return (
    <>
      <section id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <article id="weekdays">
          <div>Måndag</div>
          <div>Tisdag</div>
          <div>Onsdag</div>
          <div>Torsdag</div>
          <div>Fredag</div>
          <div>Lördag</div>
          <div>Söndag</div>
        </article>

        <article id="calendar">
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
        </article>
      </section>

      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvent({ title, date: clicked });
            setClicked(null);
            window.location.reload();
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <SingleEventModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          eventId={eventForDate(clicked)._id}
        />
      )}
    </>
  );
};
