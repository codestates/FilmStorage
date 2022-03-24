const express = require("express");
const usersRouter = express.Router();
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
})
//** multer의 역할: 파일을 가져와서, request 객체에 file/files 속성을 추가해주어 다음(next())으로 넘겨준다
// multer.single(fieldName) : 단일 파일 req.file 
// multer.array(fieldName[, maxCount]) : req.files;

const { usersController } = require("../controller");

usersRouter.patch("/profile/:user_id", upload.single("profile"), usersController.signup.profile);
usersRouter.post("/signup", usersController.signup.post);
usersRouter.post("/signin", usersController.signin.post);
usersRouter.post("/signout", usersController.signout.post);
usersRouter.patch("/update", usersController.update.patch);
usersRouter.delete("/withdrawal", usersController.withdrawal.delete);
usersRouter.get("/auth/:user_id", usersController.auth.get);
usersRouter.post("/auth/verification/:user_id", usersController.auth.verification);
usersRouter.post("/find_email", usersController.find_email.post)
usersRouter.patch("/reset_password", usersController.reset_password.patch)

module.exports = usersRouter;
