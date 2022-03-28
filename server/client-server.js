// app.js
// const isAuthenticated = async () => {
//   await axios
//     .get("https://localhost:4000/users/auth", {
//       headers: { Accept: "application/json" },
//       withCredentials: true,
//     })
// };

// useEffect(() => {
//   isAuthenticated()
// }, [])

//signinpage.jsx
// import axios from "axios"
// import {useState} from "react"

// axios.defaults.withCredentials = true;

// export default function SignInPage({isAuthenticated}) {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const handleInputValue = (key) => (e) => {
//     setLoginInfo({ ...loginInfo, [key]: e.target.value });
//   };

//     const isSignin = async () => {
//     await axios
//       .post("https://localhost:4000/users/signin", {
//         email : loginInfo.email,
//         password : loginInfo.password
//       },{
//         headers: { 
//           "Content-Type": "application/json" },
//         withCredentials: true,
//       })
//       .then((res) => {
//         isAuthenticated()
//         console.log(res)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   };