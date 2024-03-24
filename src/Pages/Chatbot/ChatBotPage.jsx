import React from "react";
import ChatBot from "../../Components/Chatbot/Chatbot";
import { WavyBackground } from "../../ui/wavy-back";

const ChatbotPage = () => {
    return (
        <div className="w-full md:p-14 p-4 flex justify-center items-center">
            <div className="w-full h-[95vh] md:h-[85vh] bg-gray-900 rounded-lg bg-opacity-60">
                <ChatBot />
            </div>
        </div>
    );
};

export default ChatbotPage;
