const express = require("express");
const galleriesRouter = express.Router();

const { galleriesController } = require("../controller");

galleriesRouter.post("/register/:user_id", galleriesController.register.post);
galleriesRouter.patch("/revision", galleriesController.revision.patch);
galleriesRouter.delete("/deletion", galleriesController.deletion.delete);
galleriesRouter.get("/total", galleriesController.total.get);
galleriesRouter.get("/topthree", galleriesController.topthree.get);
galleriesRouter.get("/mygallery", galleriesController.mygallery.get);
galleriesRouter.get("/view/:gallery_id", galleriesController.view.get);

module.exports = galleriesRouter;
