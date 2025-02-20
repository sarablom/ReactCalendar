const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
    