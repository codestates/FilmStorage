import "./App.css";
import styled from "styled-components";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
