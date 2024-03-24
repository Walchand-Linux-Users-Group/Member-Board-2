import React, { useRef } from "react";
import "./App.css";
import Chatbot from "./Components/Chatbot/Chatbot";
import Tux from "./Components/Tux/Tux";
import Title from "./Components/Title/Title";
import Enroll from "./Components/Enroll/Enroll";
import { WavyBackground } from "./ui/wavy-back.jsx";
import Info from "./Components/Information/Info.jsx";

function App() {
    const chatbotRef = useRef(null);

    const handleClickEnroll = () => {
        chatbotRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <>
        <div className="homeboday">
        <div className="center">
          <a
            href="https://www.wcewlug.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="logo" src="/Logo_White.png" alt="Logo" />
          </a>
        </div>
            <div className="maincon">
                <div className="seccon">
                   <Title />
                   <Info/>
                    <Enroll onClick={handleClickEnroll} />
                </div>
                <Tux />
            </div>
            <div className="Back">
                <WavyBackground />
            </div>
            <div ref={chatbotRef}>
                <Chatbot />
            </div>
            </div>
        </>
    );
}

export default App;
