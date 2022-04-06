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
    // description: {
    //     type: String,
    // },
    // endDate: {
    //     type: Date,
    //     required: true
    // },
    // startTime: {
    //     type: String,
    //     required: true
    // },
    // endTime: {
    //     type: String,
    //     required: true
    // },
    // location: {
    //     type: String,
    // },
    // participants: {
    //     type: [String],
    // }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
    