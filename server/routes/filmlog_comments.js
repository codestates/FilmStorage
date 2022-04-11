const express = require("express");
const filmlog_commentsRouter = express.Router();

const { filmlog_commentsController } = require("../controller");

filmlog_commentsRouter.post("/register/:user_id/:filmlog_id", filmlog_commentsController.register.post);
filmlog_commentsRouter.patch("/revision/:user_id/:filmlog_id/:filmlog_comments_id", filmlog_commentsController.revision.patch);
filmlog_commentsRouter.delete("/deletion/:filmlog_comments_id", filmlog_commentsController.deletion.delete);
filmlog_commentsRouter.get("/total/:filmlog_id", filmlog_commentsController.total.get);

module.exports = filmlog_commentsRouter;
