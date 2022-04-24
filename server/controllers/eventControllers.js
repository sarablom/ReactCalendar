const Event = require("../models/EventModel");

async function getAllEvents(req, res, next) {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    res.status(200).json({
      success: true,
      event
    });
  } catch (err) {
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found",
        });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
        success: true,
        event: updatedEvent,
    });

  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
        success: true,
        message: "Event deleted",
    });

  } catch (err) {
    next(err);
  }
}

async function createNewEvent(req, res, next) {
  try {
    const event = new Event(req.body);

    await Event.create(event);
    res.status(200).json({
        success: true,
        message: "Event created",
        event: event
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  createNewEvent,
};
