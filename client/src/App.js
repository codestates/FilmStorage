import "./App.css";
import styled from "styled-components";


const Title = styled.h1`
  padding: 20px;
  color: tomato;
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <Title>안녕하세요 wooga 팀입니다.</Title>
    </div>
  );
}

export default App;
