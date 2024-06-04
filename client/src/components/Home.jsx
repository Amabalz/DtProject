import { useContext, useState } from "react";
import ThreadCreateComp from "./ThreadCreateComp";
import Thread from "./Thread";
import SidebarComp from "./SidebarComp";
import { useEffect } from "react";
import axios from 'axios';
import { UserContext } from './Context';


function Home() {
    const { userData, setUserData } = useContext(UserContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7082/GetAllTickets');
                setTickets(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                position: "relative",
            }}
        >
            <div style={{ width: "15%", height: "100%" }}>
                {(userData.id != 0) &&
                    <>
                        <SidebarComp
                            profilePicture={"/avatar.jpg"}
                        />
                    </>
                }
                <div style={{ width: "15%", height: "100%" }}>
                    <div
                        style={{
                            width: "60%",
                            height: "100%",
                            position: "absolute",
                            left: "20%",
                            top: "0",
                        }}
                    >
                        {(userData.id != 0) && <ThreadCreateComp />}

                        {loading && !error && <h2 style={{ margin: "10px 0px 20px 0px" }}>Loading...</h2>}
                        {!loading && error && <h2 style={{ margin: "10px 0px 20px 0px" }}>An unexpected error has occurred</h2>}
                        {!loading && !error &&
                            <>
                                <h2 style={{ margin: "10px 0px 20px 0px" }}>Threads:</h2>
                                {tickets.map((ticket, index) => (
                                    <Thread
                                        key={index}
                                        id={ticket.id}
                                        userid={ticket.userid}
                                        title={ticket.title}
                                        content={ticket.data}
                                    />
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;