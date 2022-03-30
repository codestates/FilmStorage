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

//** multer의 역할: 파일을 가져와서, request 객체에 file/files 속성을 추가해주어 다음(next())으로 넘겨준다
// multer.single(fieldName) : 단일 파일 req.file
// multer.array(fieldName[, maxCount]) : req.files;
usersRouter.post("/signup", usersController.signup.post);
usersRouter.post("/signin", usersController.signin.post);
usersRouter.post("/signout", usersController.signout.post);
usersRouter.get("/auth", usersController.auth.get);

// 카카오 로그인
usersRouter.post("/oauth", usersController.signin.kakao);

// 프로필 제외 회원 정보 수정
usersRouter.patch("/update", usersController.update.patch);
// 프로필 수정
usersRouter.patch("/update/profile/:user_id", upload.single("profile"), usersController.update.profile);

// 회원 탈퇴
usersRouter.delete("/withdrawal", usersController.withdrawal.delete);

// 비밀번호 초기화 이메일
usersRouter.patch("/reset_password", usersController.reset_password.patch);

module.exports = usersRouter;
