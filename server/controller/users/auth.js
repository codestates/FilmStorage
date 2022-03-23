const nodemailer = require('nodemailer')
const { users } = require('../../models')
const transporter = nodemailer.createTransport({
    service: "gmail",  // 이메일
    auth: {
        user: process.env.MAIL_ID,  // 발송자 이메일
        pass: process.env.MAIL_PASSWORD,  // 발송자 비밀번호
    },
});
//{
// "email" : "boo1996@naver.com"   
//}

module.exports = {
    get: async (req, res) => {
        red.send("Successfully login!")
    },

    verification: async (req, res) => {
        const userEmail = await users.findOne({
            where: req.email
        })
        console.log('유저이메일#######>', userEmail)
        if (!userEmail) {
            res.send('존재하지 않는 이메일 입니다.')
        } else {
            try {

                const mailOptions = {
                    from: process.env.MAIL_ID,
                    to: req.body.email,
                    subject: "이메일 인증",
                    html: `<h1>이메일 인증</h1>
                        <div>
                          아래 버튼을 눌러 인증을 완료해주세요.
                          <a href='http://localhost:4000/users/auth/verification/${req.params.user_id}'>이메일 인증하기</a>
                        </div>`,
                    text: "인증메일입니다.",
                };
                const info = await transporter.sendMail(mailOptions);
                console.log(info);
                res.json({ data: info })
            } catch (err) {
                console.log(err)
            }
        }
    }
}