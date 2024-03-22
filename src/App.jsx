import "./App.css";
import Tux from "./Components/Tux/Tux";
import Title from "./Components/Title/Title";
import Enroll from "./Components/Enroll/Enroll";
import { WavyBackground } from "./Components/BackEffect/wavy-background";

function App() {
  return (
    <>
      <div className="maincon">
        <div className="seccon">
          <Title />
          <Enroll />
        </div>

        <Tux />
       
      </div>
      <WavyBackground />
    </>
  );
}

export default App;
