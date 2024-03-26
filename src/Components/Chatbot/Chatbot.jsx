import React, { useEffect, useRef, useState } from "react";
import TuxImg from "../../assets/tux.png";
import UserImg from "../../assets/user.png";
import questions from "../../Data/questions";
import { SendHorizonalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../Typewriter/Typewriter";
const ChatBot = () => {
    const tuxRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    // For navigation
    const navigate = useNavigate();

    const [answered, setAnswered] = useState([]);

    // To Home
    const toHome = () => {
        navigate("/");
    };

    // State variables
    const [step, setStep] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[step]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Function to handle change in input fields
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

    // Function to handle next button click
    const handleNext = () => {
        // If the current question is of type submit, then call handleApply function
        if (currentQuestion.field === "submit") {
            handleApply();
            return;
        }

        // If the current question is of type end, then navigate to home
        if (step === questions.length - 1) {
            navigate("/");
        }

        // If the current question is of type options, then check for valid option
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

        // If the current question is of type text or file, then check for constraints
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

        setAnswered([
            ...answered,
            {
                question: currentQuestion.title,
                answer:
                    currentQuestion.ansType !== "file"
                        ? answers[currentQuestion.field]
                        : answers[currentQuestion.field].name,
                type: currentQuestion.ansType,
                index: step,
                field: currentQuestion.field,
                constraints: currentQuestion.constraints,
            },
        ]);

        // If the current question is of type text or file, then move to next question
        let cur = step + 1;
        setError("");
        setStep(cur);
        setCurrentQuestion(questions[cur]);
        document.getElementById(currentQuestion.field).value = "";
    };

    const makeEditable = (index) => {
        if (
            answered[index].field === "start" ||
            answered[index].field === "submit" ||
            success ||
            step === questions.length - 1 ||
            isLoading
        ) {
            return;
        }
        document.getElementById(`userres${index}`).classList.toggle("hidden");

        const usered = document.getElementById(`usered${index}`);
        usered.classList.toggle("hidden");
        usered.classList.toggle("flex");
    };

    const handleEditSubmit = (index) => {
        if (answered[index].constraints) {
            if (answered[index].constraints.pattern) {
                if (
                    !answered[index].constraints.pattern.value.test(
                        answered[index].answer
                    )
                ) {
                    setError(answered[index].constraints.pattern.message);
                    return;
                }
            }
            if (answered[index].constraints.length) {
                if (
                    answered[index].answer.length <
                        answered[index].constraints.length.min ||
                    answered[index].answer.length >
                        answered[index].constraints.length.max
                ) {
                    setError(answered[index].constraints.length.message);
                    return;
                }
            }
            if (answered[index].constraints.required) {
                if (answered[index].answer === "" || !answered[index].answer) {
                    setError(answered[index].constraints.required.message);
                    return;
                }
            }
        }
        const userres = document.getElementById(`userres${index}`);
        userres.classList.toggle("hidden");

        const usered = document.getElementById(`usered${index}`);
        usered.classList.toggle("hidden");
        usered.classList.toggle("flex");

        console.log(answers);
        console.log(answered);
    };

    // Function to handle apply button click
    const handleApply = async () => {
        setIsLoading(true);
        const url = "https://wlug-mb2-backend.onrender.com/api/user/apply";
        const formData = new FormData();

        // Append all answers to formData
        for (const key in answers) {
            formData.append(key, answers[key]);
        }

        try {
            // Make a POST request to the server
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const json = await res.json();
            if (res.ok) {
                console.log(json);
                setSuccess(true);

                setAnswered([
                    ...answered,
                    { question: currentQuestion.title, answer: "Yes" },
                ]);
                let cur = step + 1;
                setError("");
                setStep(cur);
                setCurrentQuestion(questions[cur]);
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
        setIsLoading(false);
    };

    const handleEdit1 = (e, ind) => {
        const editQuestion = answered[ind];
        setAnswers({
            ...answers,
            [editQuestion.field]: e.target.value,
        });
        const temp = answered;
        temp[ind].answer = e.target.value;
        setAnswered(temp);
    };

    const handleEdit2 = (e, ind) => {
        const editQuestion = answered[ind];
        console.log(e.target.files[0]);
        setAnswers({
            ...answers,
            [editQuestion.field]: e.target.files[0],
        });
        const temp = answered;
        temp[ind].answer = e.target.files[0].name;
        setAnswered(temp);
    };
    useEffect(() => {
        tuxRef.current.scrollIntoView({ behavior: "smooth" });
    }, [answered, error]);

    return (
        <div className="w-full flex justify-center items-center">
            {/* Main container */}
            <div
                id="main-chat-cont"
                className="relative lg:w-4/5 w-11/12 h-[90vh] bg-gray-900 rounded-lg bg-opacity-60"
            >
                <div className="overflow-y-scroll p-6 custom-scrollbar h-[70vh]">
                    {answered.length > 0 &&
                        answered.map((curque, ind) => {
                            return (
                                <div className="w-full space-y-4 mb-6">
                                    <div className=" max-w-[85%]">
                                        <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                                            <img src={TuxImg}></img>
                                        </div>

                                        <div className="ml-8 space-y-4">
                                            <div className="w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6 text-white font-chatbot font-semibold text-xl">
                                                {curque.question}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className="flex flex-row-reverse">
                                            <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                                                <img src={UserImg}></img>
                                            </div>
                                            <div className="mt-8">
                                                <div
                                                    className="w-fit max-w-[50vw] cursor-pointer bg-[#B557C4] p-3 md:p-6 rounded-[15px] text-white font-chatbot font-semibold text-xl break-words"
                                                    id={`userres${curque.index}`}
                                                    onClick={() =>
                                                        makeEditable(
                                                            curque.index
                                                        )
                                                    }
                                                >
                                                    {curque.answer}
                                                </div>
                                                {/* create a inline input for editing respone */}
                                                <div
                                                    className="hidden w-full rounded-[15px] bg-gray-800 p-3"
                                                    id={`usered${curque.index}`}
                                                >
                                                    {curque.type === "text" ? (
                                                        <input
                                                            className=" w-full rounded-[15px] bg-gray-800 outline-none text-xl p-4 text-gray-400"
                                                            placeholder={
                                                                "Type here..."
                                                            }
                                                            onChange={(e) =>
                                                                handleEdit1(
                                                                    e,
                                                                    ind
                                                                )
                                                            }
                                                            onFocus={(e) => {
                                                                setError("");
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                    ) : curque.type ===
                                                      "options" ? (
                                                        <select
                                                            className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-xl p-4 text-gray-400"
                                                            onChange={(e) =>
                                                                handleEdit1(
                                                                    e,
                                                                    ind
                                                                )
                                                            }
                                                            onFocus={(e) => {
                                                                setError("");
                                                            }}
                                                        >
                                                            <option
                                                                value=""
                                                                className="mb-5"
                                                            >
                                                                Select an option
                                                            </option>
                                                            {questions[
                                                                ind
                                                            ].options.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            option
                                                                        }
                                                                        className="bg-gray-800 text-gray-400 p-3 mt-8"
                                                                    >
                                                                        {option}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            className="w-11/12 rounded-[15px] bg-gray-800 outline-none text-xl p-4 text-gray-400"
                                                            type="file"
                                                            onChange={(e) =>
                                                                handleEdit2(
                                                                    e,
                                                                    ind
                                                                )
                                                            }
                                                            onFocus={(e) => {
                                                                setError("");
                                                            }}
                                                            accept={
                                                                questions[ind]
                                                                    .field ===
                                                                "photo"
                                                                    ? "image/*"
                                                                    : ".pdf"
                                                            }
                                                        />
                                                    )}
                                                    <button
                                                        onClick={(e) =>
                                                            handleEditSubmit(
                                                                ind
                                                            )
                                                        }
                                                    >
                                                        <SendHorizonalIcon
                                                            color="white"
                                                            className="w-8 h-8"
                                                        ></SendHorizonalIcon>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    {/* Tux Side */}
                    <div className="w-full space-y-1 mt-4">
                        {/* Tux Image */}
                        <div className="w-8 h-8 aspect-square rounded-full bg-gray-700 p-1">
                            <img src={TuxImg}></img>
                        </div>

                        {/* Tux Conversation */}
                        <div className="ml-8 space-y-4">
                            {/* Message */}
                            <div
                                className="max-w-[85%] w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6 text-white font-chatbot font-semibold text-xl"
                                id="tux-conv"
                            >
                                <Typewriter text={currentQuestion.title} />
                            </div>
                            {/* Error */}
                            {error !== "" ? (
                                <div className="w-fit rounded-[15px] bg-indigo-700 p-3 md:p-6 font-chatbot font-semibold text-xl text-red-500">
                                    <Typewriter text={error} id="tux-error" />
                                </div>
                            ) : (
                                <></>
                            )}

                            <div ref={tuxRef}></div>
                        </div>
                    </div>
                </div>

                {/* User side */}
                <div className="w-full flex p-4 absolute bottom-2">
                    {isLoading ? (
                        <div className="flex w-full border bg-gray-800 border-gray-500 rounded-[15px] p-2 px-4 justify-center space-x-3">
                            <div className="w-16 h-16 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex justify-between w-full border bg-gray-800 border-gray-500 rounded-[15px] p-2 px-4">
                            {/* Input field */}
                            {
                                // If the current question is of type file, then show a file input field
                                currentQuestion.ansType === "file" ? (
                                    <input
                                        className="w-11/12 rounded-[15px] bg-gray-800 outline-none text-xl p-4 text-gray-400"
                                        type="file"
                                        id={currentQuestion.field}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            setError("");
                                        }}
                                        accept={
                                            currentQuestion.field === "photo"
                                                ? "image/*"
                                                : ".pdf"
                                        }
                                    />
                                ) : currentQuestion.ansType === "options" ? (
                                    <>
                                        <select
                                            className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-xl p-4 text-gray-400"
                                            id={currentQuestion.field}
                                            onChange={handleChange}
                                            onFocus={(e) => {
                                                setError("");
                                            }}
                                        >
                                            <option value="" className="mb-5">
                                                Select an option
                                            </option>
                                            {currentQuestion.options.map(
                                                (option, index) => (
                                                    <option
                                                        key={index}
                                                        value={option}
                                                        className="bg-gray-800 text-gray-400 p-3 mt-8"
                                                    >
                                                        {option}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </>
                                ) : (
                                    <input
                                        className="rounded-[15px] w-11/12 bg-gray-800 outline-none text-xl p-4 text-gray-400"
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

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className=" bg-gray-800 hover:bg-gray-900"
                            >
                                <SendHorizonalIcon
                                    color="white"
                                    className="w-6 h-6 md:w-10 md:h-10"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;