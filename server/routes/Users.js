const express = require("express");
const usersRouter = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({ // 2
    destination(req, file, cb) {
        cb(null, 'uploadedFiles/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    },
});
const upload = multer({ dest: 'uploadedFiles/' }); // 3-1
const uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

const { usersController } = require("../controller");

usersRouter.post("/signup", usersController.signup.post);
usersRouter.post("/signin", usersController.signin.post);
usersRouter.post("/signout", usersController.signout.post);
usersRouter.patch("/update", usersController.update.patch);
usersRouter.delete("/withdrawal", usersController.withdrawal.delete);
usersRouter.get("/auth/:user_id", usersController.auth.get);
usersRouter.post("/auth/verification/:user_id", usersController.auth.verification);

module.exports = usersRouter;
