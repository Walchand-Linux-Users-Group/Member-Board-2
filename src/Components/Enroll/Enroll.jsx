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
                    <a href="https://www.instagram.com/wcewlug/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="https://www.linkedin.com/in/wlug-club-3a9236117/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="https://discord.wcewlug.org/join" target="_blank" rel="noopener noreferrer">
                        Discord
                    </a>
                <a href="https://twitter.com/wcewlug" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
            </div>
        </>
    );
}
