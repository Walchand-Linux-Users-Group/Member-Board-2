import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ChatbotPage from "./Pages/Chatbot/ChatBotPage";
import { WavyBackground } from "./ui/wavy-back";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/register" element={<ChatbotPage/>}></Route>
                </Routes>
            </BrowserRouter>
            <div className="Back">
                <WavyBackground />
            </div>
        </div>
    );
}

export default App;
