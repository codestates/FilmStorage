const express = require("express");
const boardsRouter = express.Router();

const { boardsController } = require("../controller");

boardsRouter.post("/register/:user_id", boardsController.register.post);
boardsRouter.patch("/revision", boardsController.revision.patch);
boardsRouter.delete("/deletion", boardsController.deletion.delete);
boardsRouter.get("/total", boardsController.total.get);
boardsRouter.get("/view/:board_id", boardsController.view.get);

module.exports = boardsRouter;
