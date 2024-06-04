import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { UserContext } from './Context';

const UserThreads = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [threads, setThreads] = useState([]);
    const [threadsLoading, setThreadsLoading] = useState(true);
    const [threadsError, setThreadsError] = useState(false);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/GetTicketUserId/${userData.id}`);
                setThreads(response.data);
                setThreadsLoading(false);
            } catch (error) {
                console.log(error);
                setThreadsError(error.response.data);
                setThreadsLoading(false);
            }
        };

        fetchThreads();
    }, []);

    return (
        <div
            style={{
                background: "#1895D7", // schimba culoarea
                margin: "10px 10px 10px 10px",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
            }}
        >
            {threadsLoading && !threadsError && <h3>Loading...</h3>}
            {!threadsLoading && threadsError && <h3>No threads posted yet</h3>}
            {!threadsLoading && !threadsLoading &&
                <>
                {threads.map((thread, index) => (
                    <div 
                        key={index}
                    >
                        <h2>Title: {thread.title}</h2>
                        <p>{thread.data}</p>
                    </div>
                ))}
                </>
            }
        </div>
    );
};

export default UserThreads;
