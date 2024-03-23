import "./App.css";
import Chatbot from "./Components/Chatbot/Chatbot";
import Tux from "./Components/Tux/Tux";
import Title from "./Components/Title/Title";
import Enroll from "./Components/Enroll/Enroll";
import { WavyBackground } from "./ui/wavy-back.jsx";

function App() {
  return (
    <>
        {/* <div className="maincon">
          <div className="seccon">
            <Title />
            <Enroll />
          </div>

          <Tux />
        </div>
      <div className="Back">
      <WavyBackground/>
      </div> */}
      <Chatbot/>
    </>
  );
}

export default App;
