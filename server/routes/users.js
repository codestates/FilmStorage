const express = require("express");
const usersRouter = express.Router();
const { usersController } = require("../controller");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "profiles/");
        },
        filename: (req, file, cb) => {
            let randomNum = Math.floor((Math.random() + Math.random()) * 1000000);
            cb(null, randomNum + "_" + "profile.jpg");
        },
    }),
});


usersRouter.post("/signup", usersController.signup.post);
usersRouter.post("/signin", usersController.signin.post);
usersRouter.post("/signout", usersController.signout.post);
usersRouter.get("/auth", usersController.auth.get);

// 카카오 로그인
usersRouter.post("/oauth", usersController.signin.kakao);

// 회원 정보 수정
usersRouter.patch("/update", usersController.update.patch);
// 비밀번호 변경
usersRouter.patch("/update/password", usersController.update.password);
// 프로필 수정
usersRouter.patch("/update/profile/:user_id", upload.single("profile"), usersController.update.profile);
// 회원 탈퇴
usersRouter.delete("/withdrawal", usersController.withdrawal.delete);
// 비밀번호 초기화 이메일
usersRouter.get("/find_password", usersController.find_info.find_password);
// 아이디 찾기 요청
usersRouter.get("/find_email", usersController.find_info.find_email);

module.exports = usersRouter;
