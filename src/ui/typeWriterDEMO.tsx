import React from "react";
import { TypewriterEffectSmooth } from ".././ui/typeWriterSrc";
export function TypewriterEffectSmoothDemo() {
  const words = [
    { text: "Last" },
    { text: "Chance" },
    { text: "to" },
    { text: "be" },
    { text: "a" },
    { text: "part" }, 
    { text: "of" },
    { text: "this" },
    { text: "family" },
    {
      text: "Apply Now",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (

      <TypewriterEffectSmooth words={words} />

  );
}
