import React, { useRef } from "react";
import "./App.css";
import Chatbot from "./Components/Chatbot/Chatbot";
import Tux from "./Components/Tux/Tux";
import Title from "./Components/Title/Title";
import Enroll from "./Components/Enroll/Enroll";
import { WavyBackground } from "./ui/wavy-back.jsx";

function App() {
    const chatbotRef = useRef(null);

    const handleClickEnroll = () => {
        chatbotRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <>
            <div className="maincon">
                <div className="seccon">
                    <Title />
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
        </>
    );
}

export default App;
