import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ChatbotPage from "./Pages/Chatbot/ChatBotPage";
import { WavyBackground } from "./ui/wavy-backSRC";
import { AuroraBackgroundDemo } from "./ui/aura-backDEMO"

function App() {
    return (
        <div className=" dark">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/register" element={<ChatbotPage/>}></Route>
                </Routes>
            </BrowserRouter>
            <div className="Back">
                {/* <WavyBackground /> */}
                <AuroraBackgroundDemo/>
            </div>
        </div>
    );
}

export default App;
