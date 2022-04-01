import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilmLogPage from "./pages/FilmLogPage";
import TodayFilmPage from "./pages/TodayFilmPage";
import FilmTalkPage from "./pages/FilmTalkPage";
import FindingFilmTypePage from "./pages/FindingFilmTypePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import FilmLogDetailPage from "./pages/FilmLogDetailPage";
import "./App.css";
import FilmTalkView from "./pages/FilmTalkView";
import UserInfoUpdatePage from "./pages/UserPage";
import FilmTalkResigserPage from "./pages/FilmTalkRegisterPage";
import OauthPage from "./pages/OauthPage";
import MapContainer from "./pages/map"
import MyLogPage from "./pages/MyLogPage";

import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    nickname: "",
    profile: "",
  });

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/auth`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        const { id, email, nickname, profile } = res.data.data;
        setUserInfo({
          id,
          email,
          nickname,
          profile,
        });
        setIsLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        userInfo={userInfo}
        setIsLogin={setIsLogin}
        setUserInfo={setUserInfo}
      />
      <Switch>
      <Route exact path="/map">
          <MapContainer />
        </Route>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/filmlog">
          <FilmLogPage userInfo={userInfo} />
        </Route>
        <Route path="/filmtalks/total">
          <FilmTalkPage />
        </Route>
        <Route path="/filmtalks/view">
          <FilmTalkView />
        </Route>
        <Route path="/todayfilm">
          <TodayFilmPage />
        </Route>
        <Route path="/signin">
          <SignInPage handleResponseSuccess={handleResponseSuccess} />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/filmtype">
          <FindingFilmTypePage />
        </Route>
        <Route path="/filmlogdetail">
          <FilmLogDetailPage userInfo={userInfo} />
        </Route>
        <Route path="/filmlogs/total">
          <FilmLogPage />
        </Route>
        <Route path="/users/update">
          <UserInfoUpdatePage userInfo={userInfo} />
        </Route>
        <Route path="/filmtalks/register">
          <FilmTalkResigserPage />
        </Route>
        <Route path="/oauth">
          <OauthPage isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/mylog">
          <MyLogPage userInfo={userInfo} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
