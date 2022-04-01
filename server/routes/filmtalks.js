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
// 필름토크 내 미리보기용 이미지 URL 응답
filmtalksRouter.post("/register/image/:user_id", upload.single("image"), filmtalksController.register.imageURL);
// 필름토크 내용 수정
filmtalksRouter.patch("/revision/:user_id/:filmtalk_id", filmtalksController.revision.patch);
// 필름토크 내용 삭제
filmtalksRouter.delete("/deletion/:filmtalk_id", filmtalksController.deletion.delete);
// 필름토크 전체 내용 조회
filmtalksRouter.get("/total", filmtalksController.total.get);
// 필름토크 게시물 좋아요 추가
filmtalksRouter.get("/view/:filmtalk_id", filmtalksController.view.get);

module.exports = filmtalksRouter;