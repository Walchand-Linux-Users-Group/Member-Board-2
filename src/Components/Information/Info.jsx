import "./Info.css";
// import {SparklesPreview} from "../../ui/sparkelsDEMO"
import { TypewriterEffectSmoothDemo } from "../../ui/typeWriterDEMO";
export default function Info() {
  return (
    <>
      <div
        className="infocon container mx-auto p-4 m-4 flex flex-col
      justify-center items-center "
      >
        <p className="infol text-4xl md:text-5xl font-bold dark:text-white text-center">
          {" "}
          Member Board Drive 2
        </p>
        {/* <p className="ml
            text-1xl md:text-3xl font-bold ">Last Chance to be a part of this family</p>
            <p className="sl">Apply now</p> */}
        {/* <SparklesPreview/> */}

        {/*  
            
                Passed all text contents to this DEMO comp -> 
                couldve done better using Props or Coustom Hooks 
                but did anyways sorry 
                                                --Vighnesh 1:13 mar23
            */}
        <p className="infopara font-bold px-2 ">
          {" "}
          Join our Linux community. Experience Open Source.
        </p>
        <div className="text-center text-xl mx-auto">
          <div className="typewriter-container p-4 mx-auto">
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
