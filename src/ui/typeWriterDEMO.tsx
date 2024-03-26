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
  ];
  return (

      <TypewriterEffectSmooth words={words} />

  );
}
