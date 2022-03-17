const express = require("express");
const board_commentsRouter = express.Router();

const { board_commentsController } = require("../controller");

board_commentsRouter.post("/register/:user_id", board_commentsController.register.post);
board_commentsRouter.patch("/revision", board_commentsController.revision.patch);
board_commentsRouter.delete("/deletion", board_commentsController.deletion.delete);
board_commentsRouter.get("/total/:board_id", board_commentsController.total.get);

module.exports = board_commentsRouter;
