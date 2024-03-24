import React from "react";
import ChatBot from "../../Components/Chatbot/Chatbot";
import { WavyBackground } from "../../ui/wavy-back";

const ChatbotPage = () => {
    return (
        <div>
            <div >
                <ChatBot />
            </div>
            <div className="Back">
                <WavyBackground />
            </div>
        </div>
    );
};

export default ChatbotPage;
