module.exports = {
  //로그아웃 기능 
  post: async (req, res) => {
    try {
      res.status(205)
        .clearCookie("accessToken", {
          sameSite: "none",
          domain: "localhost",
          path: "/",
          secure: true,
          httpOnly: true
        })
        .send({ message: "Successfully Logged Out" })
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
}