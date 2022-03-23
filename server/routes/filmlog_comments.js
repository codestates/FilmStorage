const express = require("express");
const filmlog_commentsRouter = express.Router();

const { filmlog_commentsController } = require("../controller");

filmlog_commentsRouter.post("/register/:user_id", filmlog_commentsController.register.post);
filmlog_commentsRouter.patch("/revision", filmlog_commentsController.revision.patch);
filmlog_commentsRouter.delete("/deletion", filmlog_commentsController.deletion.delete);
filmlog_commentsRouter.get("/total/:gallery_id", filmlog_commentsController.total.get);

module.exports = filmlog_commentsRouter;
