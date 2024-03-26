import "./title.css";

export default function Title() {
  return (
    <>
      <div className="contain">
        <h1 className="title text-3xl md:text-5xl font-bold dark:text-white text-center">
          Walchand Linux
        </h1>
        <h1 className="title2 text-3xl md:text-5xl font-bold dark:text-white text-center">
          Users' Group
        </h1>
        <p className="motto dark text-1xl font-bold dark:text-white text-center mt-3"
            >COMMUNITY | KNOWLEDGE | SHARE</p>
      </div>
    </>
  );
}

/**
 *
 * className="dark text-3xl md:text-7xl font-bold dark:text-white text-center"
 */
