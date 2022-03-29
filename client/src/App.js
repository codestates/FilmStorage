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
import FilmTalkDetail from "./pages/FilmTalkDetail";
import UserInfoUpdatePage from "./pages/UserPage";
import FilmTalkResigserPage from "./pages/FilmTalkRegisterPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/filmlog">
          <FilmLogPage />
        </Route>
        <Route path="/filmtalks/total">
          <FilmTalkPage />
        </Route>
        <Route path="/filmtalks/view">
          <FilmTalkDetail />
        </Route>
        <Route path="/todayfilm">
          <TodayFilmPage />
        </Route>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/filmtype">
          <FindingFilmTypePage />
        </Route>
        <Route path="/filmlogdetail">
          <FilmLogDetailPage />
        </Route>
        <Route path="/filmlogs/total">
          <FilmLogPage />
        </Route>
        <Route path="/users/update">
          <UserInfoUpdatePage />
        </Route>
        <Route path="/filmtalks/register">
          <FilmTalkResigserPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
