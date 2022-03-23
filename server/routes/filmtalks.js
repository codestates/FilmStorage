const express = require("express");
const filmtalksRouter = express.Router();

const { filmtalksController } = require("../controller");

filmtalksRouter.post("/register/:user_id", filmtalksController.register.post);
filmtalksRouter.patch("/revision", filmtalksController.revision.patch);
filmtalksRouter.delete("/deletion", filmtalksController.deletion.delete);
filmtalksRouter.get("/total", filmtalksController.total.get);
filmtalksRouter.get("/view/:board_id", filmtalksController.view.get);

module.exports = filmtalksRouter;
