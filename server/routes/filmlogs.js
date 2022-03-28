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

filmlogsRouter.delete("/deletion", filmlogsController.deletion.delete);
filmlogsRouter.get("/total", filmlogsController.total.get);
filmlogsRouter.get("/topthree", filmlogsController.topthree.get);
filmlogsRouter.get("/mygallery", filmlogsController.mygallery.get);
filmlogsRouter.get("/view/:gallery_id", filmlogsController.view.get);

module.exports = filmlogsRouter;
