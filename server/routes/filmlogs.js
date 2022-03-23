const express = require("express");
const filmlogsRouter = express.Router();

const { filmlogsController } = require("../controller");

filmlogsRouter.post("/register/:user_id", filmlogsController.register.post);
filmlogsRouter.patch("/revision", filmlogsController.revision.patch);
filmlogsRouter.delete("/deletion", filmlogsController.deletion.delete);
filmlogsRouter.get("/total", filmlogsController.total.get);
filmlogsRouter.get("/topthree", filmlogsController.topthree.get);
filmlogsRouter.get("/mygallery", filmlogsController.mygallery.get);
filmlogsRouter.get("/view/:gallery_id", filmlogsController.view.get);

module.exports = filmlogsRouter;
