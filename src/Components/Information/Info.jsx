import "./Info.css";
export default function Info() {
  return (
    <>
      <div className="infocon container mx-auto flex flex-col justify-center items-center ">
        <p className="infol text-4xl md:text-5xl font-bold dark:text-white text-center mt-4">
          Member Board Drive 2
        </p>
        <p className="infopara">
          Prepare to join a vibrant community of Linux enthusiasts and immerse
          yourself in the dynamic world of Open Source.
        </p>
        {/* <div className="text-center text-1xl">
          <BasicType />
        </div> */}
      </div>
    </>
  );
}
