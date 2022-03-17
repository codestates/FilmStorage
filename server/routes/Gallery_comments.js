const express = require("express");
const gallery_commentsRouter = express.Router();

const { gallery_commentsController } = require("../controller");

gallery_commentsRouter.post("/register/:user_id", gallery_commentsController.register.post);
gallery_commentsRouter.patch("/revision", gallery_commentsController.revision.patch);
gallery_commentsRouter.delete("/deletion", gallery_commentsController.deletion.delete);
gallery_commentsRouter.get("/total/:gallery_id", gallery_commentsController.total.get);

module.exports = gallery_commentsRouter;
