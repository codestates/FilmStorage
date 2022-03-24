import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilmLogPage from "./pages/FilmLogPage";
import TodayFilmPage from  "./pages/TodayFilmPage";
import FilmTalkPage from "./pages/FilmTalkPage";
import FindingFilmTypePage from "./pages/FindingFilmTypePage"
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import FilmLogDetail from "./pages/FilmLogDetail";
import "./App.css";

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
        <Route path="/filmtalk">
          <FilmTalkPage />
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
          <FilmLogDetail />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
