import React, { useState } from "react";
import TuxImg from "../../assets/tux.png";
import questions from "../../Data/questions";
import { ArrowLeft, SendHorizonalIcon, StepBackIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../Typewriter/Typewriter";
const ChatBot = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[step]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setError("");
        if (currentQuestion.ansType === "file") {
            setAnswers({
                ...answers,
                [currentQuestion.field]: e.target.files[0],
            });
            console.log(answers);
            return;
        }
        setAnswers({ ...answers, [currentQuestion.field]: e.target.value });
        console.log(answers);
    };

    const handleNext = () => {
        // if (currentQuestion.field === "submit") {
        //     handleApply();
        //     return;
        // }
        if (step === questions.length - 1) {
            navigate("/");
        }
        if (currentQuestion.ansType === "options") {
            if (
                !currentQuestion.options.includes(
                    document.getElementById(currentQuestion.field).value
                )
            ) {
                setError("Please select a valid option.");
                return;
            }
        }

        if (
            currentQuestion.ansType === "text" ||
            currentQuestion.ansType === "file"
        ) {
            if (currentQuestion.constraints) {
                if (currentQuestion.constraints.required) {
                    if (
                        answers[currentQuestion.field] === "" ||
                        !answers[currentQuestion.field]
                    ) {
                        setError(currentQuestion.constraints.required.message);
                        return;
                    }
                }
                if (currentQuestion.constraints.pattern) {
                    if (
                        !currentQuestion.constraints.pattern.value.test(
                            document.getElementById(currentQuestion.field).value
                        )
                    ) {
                        setError(currentQuestion.constraints.pattern.message);
                        return;
                    }
                }
                if (currentQuestion.constraints.length) {
                    if (
                        document.getElementById(currentQuestion.field).value
                            .length < currentQuestion.constraints.length.min ||
                        document.getElementById(currentQuestion.field).value
                            .length > currentQuestion.constraints.length.max
                    ) {
                        setError(currentQuestion.constraints.length.message);
                        return;
                    }
                }
            }
        }
        let cur = step + 1;
        setError("");
        setStep(cur);
        setCurrentQuestion(questions[cur]);
        document.getElementById(currentQuestion.field).value = "";
    };

    const handleApply = async (e) => {
        // e.preventDefault();
        const url = "http://localhost:5000/api/user/apply";
        const formData = new FormData();
        console.log(answers)
        formData.append("fullname", answers.fullname);
        formData.append("branch", answers.branch);
        formData.append("phoneNo", answers.phoneNo);
        formData.append("resume", answers.resume);
        formData.append("email", answers.email);
        formData.append("photo", answers.photo);
        formData.append("whyJoinClub", answers.whyJoinClub);
        formData.append("favoriteQuote", answers.favoriteQuote);
        
        const res = await fetch(url, {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: answers,
        });

        if (res.status === 200) {
            setSuccess(true);
            console.log(res.json);
            let cur = step + 1;
            setError("");
            setStep(cur);
            setCurrentQuestion(questions[cur]);
        } else {
            setError("Something went wrong. Please try again later.");
        }
    };
    return (
        <div className="w-full space-y-4">
            <div className="w-full flex flex-col justify-between p-6 min-h-[95vh] md:h-[86vh] md:min-h-[86vh] bg-gray-900 rounded-lg bg-opacity-60">
                <div className="w-full flex space-x-4 md:space-x-6">
                    <div className="w-2/12 h-fit md:w-1/12 aspect-square rounded-full bg-gray-800 p-2">
                        <img src={TuxImg}></img>
                    </div>
                    <div className="w-9/12 md:w-10/12 space-y-4">
                        <div className="min-h-24 w-full rounded-[35px] bg-gray-800 p-6 text-white font-mono font-semibold text-xl">
                            <Typewriter text={currentQuestion.title} />
                        </div>
                        {error !== "" ? (
                            <div className="min-h-20 w-full rounded-[35px] bg-gray-800 p-6 font-mono font-semibold text-xl text-red-500">
                                <Typewriter text={error} />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div className="w-full space-y-6">
                        {currentQuestion.ansType === "options" ? (
                            <div className="md:ml-28 w-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <button
                                            key={index}
                                            className="text-gray-400 min-w-32 max-w-48 p-4 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900 text-lg"
                                            onClick={(e) => {
                                                setError("");
                                                setAnswers({
                                                    ...answers,
                                                    [currentQuestion.field]:
                                                        option,
                                                });
                                            }}
                                        >
                                            {option}
                                        </button>
                                    )
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                        {/* Laptop */}
                        <div className="hidden md:flex w-full justify-between space-x-4">
                            <button
                                onClick={(e) => {
                                    if (step > 0) {
                                        let cur = step - 1;
                                        setError("");
                                        setStep(cur);
                                        setCurrentQuestion(questions[cur]);
                                    }
                                }}
                                className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900 "
                            >
                                <ArrowLeft
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="h-16 md:h-24 w-11/12 bg-gray-800 border border-gray-400 rounded-[35px] outline-none text-xl p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                    />
                                ) : (
                                    <input
                                        className="h-16 md:h-24 w-11/12 bg-gray-800 border border-gray-400 rounded-[35px] outline-none text-xl p-4 text-gray-400"
                                        placeholder={"Type here..."}
                                        disabled={
                                            currentQuestion.ansType ===
                                            "options"
                                        }
                                        value={answers[currentQuestion.field]}
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        autoComplete="off"
                                    ></input>
                                )
                            }

                            <button
                                onClick={handleNext}
                                className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[30px] border border-gray-400 hover:bg-gray-900"
                            >
                                <SendHorizonalIcon
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>
                        </div>
                        {/* Mobile */}
                        <div className=" md:hidden w-full space-y-3">
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="h-16 md:h-24 w-full bg-gray-800 border border-gray-400 rounded-[15px] outline-none text-xl p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                    />
                                ) : (
                                    <input
                                        className="h-16 md:h-24 w-full bg-gray-800 border border-gray-400 rounded-[15px] outline-none text-xl p-4 text-gray-400"
                                        placeholder={"Type here..."}
                                        disabled={
                                            currentQuestion.ansType ===
                                            "options"
                                        }
                                        value={
                                            answers[currentQuestion.field] || ""
                                        }
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        autoComplete="off"
                                        type={
                                            currentQuestion.ansType === "file"
                                                ? "file"
                                                : "text"
                                        }
                                    ></input>
                                )
                            }
                            <div className="flex justify-between ">
                                <button
                                    onClick={(e) => {
                                        if (step > 0) {
                                            let cur = step - 1;
                                            setError("");
                                            setStep(cur);
                                            setCurrentQuestion(questions[cur]);
                                        }
                                    }}
                                    className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[15px] border border-gray-400 hover:bg-gray-900"
                                >
                                    <ArrowLeft
                                        color="white"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="h-16 md:h-24 py-4 px-4 md:px-8 bg-gray-800 rounded-[15px] border border-gray-400 hover:bg-gray-900"
                                >
                                    <SendHorizonalIcon
                                        color="white"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
