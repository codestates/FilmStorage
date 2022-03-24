import "./App.css";
import styled from "styled-components";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Title = styled.h1`
  padding: 20px;
  color: tomato;
  text-align: center;
`;

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
