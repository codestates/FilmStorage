const express = require("express");
const filmtalksRouter = express.Router();
const { filmtalksController } = require("../controller");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images/");
        },
        filename: (req, file, cb) => {
            let randomNum = Math.floor((Math.random() + Math.random()) * 1000000);
            cb(null, randomNum + "_" + "images.jpg");
        },
    }),
});

// 이미지 제외 내용 등록
filmtalksRouter.post("/register/:user_id", filmtalksController.register.post);
// 필름토크 이미지 등록 및 수정
filmtalksRouter.patch("/revision/image/:user_id/:filmtalk_id", upload.array("images", 3), filmtalksController.revision.images);
// 필름토크 내용 수정
filmtalksRouter.patch("/revision/:user_id/:filmtalk_id", filmtalksController.revision.patch);
// 필름토크 내용 삭제
filmtalksRouter.delete("/deletion/:filmtalk_id", filmtalksController.deletion.delete);
// 필름토크 전체 내용 조회
filmtalksRouter.get("/total", filmtalksController.total.get);
// 필름토크 게시물 좋아요 추가
filmtalksRouter.get("/view/:board_id", filmtalksController.view.get);

module.exports = filmtalksRouter;