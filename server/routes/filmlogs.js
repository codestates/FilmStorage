const express = require("express");
const filmlogsRouter = express.Router();
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "photos/");
        },
        filename: (req, file, cb) => {
            let randomNum = Math.floor((Math.random() + Math.random()) * 1000000)
            cb(null, randomNum + "_" + "photo.jpg");
        },
    }),
});

const { filmlogsController } = require("../controller");
// 카테고리, 컨텐츠 등 Text 내용 등록 시
filmlogsRouter.post("/register/:user_id", upload.single("photo"), filmlogsController.register.post);
// 이미지 등록 시
filmlogsRouter.patch("/revision/image/:user_id/:filmlog_id", upload.single("photo"), filmlogsController.revision.photo);

filmlogsRouter.patch("/revision/:user_id/:filmlog_id", filmlogsController.revision.patch);


filmlogsRouter.delete("/deletion", filmlogsController.deletion.delete);
filmlogsRouter.get("/total", filmlogsController.total.get);
filmlogsRouter.get("/topthree", filmlogsController.topthree.get);
filmlogsRouter.get("/mygallery", filmlogsController.mygallery.get);
filmlogsRouter.get("/view/:gallery_id", filmlogsController.view.get);

module.exports = filmlogsRouter;
