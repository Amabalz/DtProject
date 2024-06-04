import { useContext, useState } from "react";
import axios from 'axios';
import Popup from 'reactjs-popup';
import { UserContext } from './Context';

function ThreadCreateComp() {
    const { userData, setUserData } = useContext(UserContext);
    const [threadTitle, setThreadTitle] = useState("");
    const [threadDescription, setThreadDescription] = useState("");
    const [postMessage, setPostMessage] = useState("Posting failed");

    const handleSubmit = (e) => {
        e.preventDefault();

        setPostMessage("Posting failed");
        axios.post('http://localhost:7082/AddTicket', {
            "userid": userData.id,
            "title": threadTitle,
            "data": threadDescription
        })
        .then(function (response) {
            setPostMessage("Posted successfully");
            setThreadDescription("");
            setThreadTitle("");
        })
        .catch(function (error) {
            setPostMessage("Invalid data");
        });
    };

    return (
        <main
            className="createThread"
            style={{
                background: "#1895D7",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "20px",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                Create a Thread
            </h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="home__container">
                    <div>
                        <input
                            placeholder="Thread Title"
                            type="text"
                            name="threadTitle"
                            required
                            value={threadTitle}
                            onChange={(e) => setThreadTitle(e.target.value)}
                            style={{
                                width: "100%",
                                height: "50px",
                                fontSize: "18px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                marginBottom: "15px",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1895D7")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                        <textarea
                            placeholder="Enter your thread here..."
                            name="threadDescription"
                            required
                            value={threadDescription}
                            onChange={(e) => setThreadDescription(e.target.value)}
                            style={{
                                width: "100%",
                                height: "150px",
                                fontSize: "18px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                                transition: "border-color 0.3s ease",
                                resize: "none",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1895D7")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Popup trigger=
                        {
                            <button
                                className="homeBtn"
                                style={{
                                    backgroundColor: "white",
                                    color: "#000000",
                                    borderRadius: "5px",
                                    border: "none",
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    transition: "0.3s ease",
                                }}
                                type="submit"
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#1071A1")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffffff")}
                            >
                                POST
                            </button>
                        }
                        position="left">
                        <div>{postMessage}</div>
                    </Popup>
                </div>
            </form>
        </main>
    );
}

export default ThreadCreateComp;
