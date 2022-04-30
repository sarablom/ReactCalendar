const { Router } = require("express");
const router = new Router();
const eventControllers = require("../controllers/eventControllers");

router.get("/", eventControllers.getAllEvents);

router.get("/:id", eventControllers.getSingleEvent);

router.patch("/:id", eventControllers.updateEvent);

router.delete("/:id", eventControllers.deleteEvent);

router.post("/", eventControllers.createNewEvent);

module.exports = router;