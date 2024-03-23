import "./enroll.css";
export default function Enroll({ onClick}) {
    return (
        <>
            <div className="main">
                <button
                    className="buttoncss"
                    onClick={() => {
                      onClick();
                    }}
                >
                    Enroll
                </button>
                <div className="links">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        Discord
                    </a>
                </div>
            </div>
        </>
    );
}
