"use client";
import React from "react";
import { Button } from "../ui/btnBorderSrc";

export function MovingBorderDemo(props) {
  return (
    <div className="mt-[-20px] p-[10px] ">
      <Button
        onClick={props.onClick}
        borderRadius="5rem"
        className=" hover:bg-gray-600 && hover:text-white transition-all duration-300 ease-in-out bg-white text-1xl w-full font-bold cursor-pointer  text-black p-2  dark:border-slate-800 dark:to-blue-500 border-4"
      >
        {props.text}
      </Button>
    </div>
  );
}


// .buttoncss {
//     display: block;
//     margin-top: 20px;
//     padding: 10px 20px;
//     border-radius: 5px;
//     border: none;
//     background-color: white;
//     color: #333;
//     font-size: 1.3m;
//     cursor: pointer;
//     transition: all 0.3s ease-in-out;
//   }