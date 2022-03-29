const express = require("express");
const filmtalk_commentsRouter = express.Router();

const { filmtalk_commentsController } = require("../controller");

filmtalk_commentsRouter.post("/register/:user_id/:filmtalk_id", filmtalk_commentsController.register.post);
filmtalk_commentsRouter.patch("/revision/:user_id/:filmtalk_id/:filmtalk_comments_id", filmtalk_commentsController.revision.patch);
filmtalk_commentsRouter.delete("/deletion/:user_id/:filmtalk_id/:filmtalk_comments_id", filmtalk_commentsController.deletion.delete);
filmtalk_commentsRouter.get("/total/:filmtalk_id", filmtalk_commentsController.total.get);

module.exports = filmtalk_commentsRouter;
