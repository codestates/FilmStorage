const express = require("express");
const filmtalk_commentsRouter = express.Router();

const { filmtalk_commentsController } = require("../controller");

// 필름토크 댓글 등록
filmtalk_commentsRouter.post("/register/:user_id/:filmtalk_id", filmtalk_commentsController.register.post);
// 필름토크 댓글 수정
filmtalk_commentsRouter.patch("/revision/:user_id/:filmtalk_id/:filmtalk_comments_id", filmtalk_commentsController.revision.patch);
// 필름토크 댓글 삭제
filmtalk_commentsRouter.delete("/deletion/:filmtalk_comments_id", filmtalk_commentsController.deletion.delete);
// 필름토크 댓글 전체 조회
filmtalk_commentsRouter.get("/total/:filmtalk_id", filmtalk_commentsController.total.get);

module.exports = filmtalk_commentsRouter;
