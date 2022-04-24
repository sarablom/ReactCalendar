require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const PORT = process.env.PORT || process.env.REACT_APP_PORT || 8000;
const DATABASE_USER = process.env.REACT_APP_MONGOUSER;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/events", eventRoutes);

app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
    });

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}... 💻`);
});

mongoose.connect(`mongodb+srv://${DATABASE_USER}@family-calender.rtn25.mongodb.net/family-calender?retryWrites=true&w=majority`)
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.log("Error connecting to database", err);
})

module.exports = app;