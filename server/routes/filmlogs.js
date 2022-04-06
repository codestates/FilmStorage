const express = require("express");
const filmlogsRouter = express.Router();
const { filmlogsController } = require("../controller");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "photos/");
        },
        filename: (req, file, cb) => {
            let randomNum = Math.floor((Math.random() + Math.random()) * 1000000);
            cb(null, randomNum + "_" + "photo.jpg");
        },
    }),
});

// 카테고리, 컨텐츠 등 Text 내용 등록시
filmlogsRouter.post("/register/:user_id", filmlogsController.register.post);
// 이미지 등록 및 수정 시
filmlogsRouter.patch("/revision/photo/:user_id/:filmlog_id", upload.single("photo"), filmlogsController.revision.photo);
// 이미지 내용만 수정 시
filmlogsRouter.patch("/revision/:user_id/:filmlog_id", filmlogsController.revision.patch)
// 필름로그 삭제
filmlogsRouter.delete("/deletion/:filmlog_id", filmlogsController.deletion.delete);
// 좋아요 기능
filmlogsRouter.post("/likes/:user_id/:filmlog_id", filmlogsController.likes.post);

// 필름로그 조회 기능
filmlogsRouter.get("/total", filmlogsController.total.get);
filmlogsRouter.get("/topthree", filmlogsController.ranking.topthree);
filmlogsRouter.get("/bestfilm", filmlogsController.ranking.bestfilm);
filmlogsRouter.get("/mylog/:user_id", filmlogsController.mylog.get);
filmlogsRouter.get("/view/:filmlog_id", filmlogsController.view.get);

//필름로그 지도정보 조회 기능
filmlogsRouter.get("/register/maps",filmlogsController.register.maps);

module.exports = filmlogsRouter;
