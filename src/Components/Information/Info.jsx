import "./Info.css";
// import {SparklesPreview} from "../../ui/sparkelsDEMO"
import { TypewriterEffectSmoothDemo } from "../../ui/typeWriterDEMO";
export default function Info() {
  return (
    <>
      <div
        className="infocon container mx-auto flex flex-col
      justify-center items-center "
      >
        <p className="infol text-4xl md:text-5xl font-bold dark:text-white text-center mt-2">
          Member Board Drive 2
        </p>
        <p className="infopara">
          Prepare to join a vibrant community of Linux enthusiasts and immerse
          yourself in the dynamic world of Open Source
        </p>
        <div className="text-center text-xl mx-auto">
          <div className="typewriter-container mx-auto">
            <TypewriterEffectSmoothDemo />
          </div>
        </div>
        <div className="forphone">
          <p>Last chance to be a part of this Family</p>
        </div>
      </div>
    </>
  );
}
