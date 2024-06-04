import { useContext, useState, useEffect } from "react";
import Comment from "./Comment";
import axios from 'axios';
import { UserContext } from './Context';

const Thread = ({ id, userid, title, content }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(null);
    const [newCommentData, setNewCommentData] = useState("");

    const handlePost = () => {
        axios.post('http://localhost:7082/AddComment', {
            "ticketid": id,
            "userid": userData.id,
            "data": newCommentData
        })
            .then(function (response) {
                setNewCommentData("");
                console.log("Posted successfully");
            })
            .catch(function (error) {
                console.log("An error has occurred");
            });
    }

    const handleCommentChange = (e) => {
        const { value } = e.target;
        setNewCommentData(value);
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/User/GetUser/${userid}`);
                setUser(response.data);
                setUserLoading(false);
            } catch (error) {
                console.log(error);
                setUserError(error.response.data);
                setUserLoading(false);
            }
        };

        const fetchComment = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/GetCommentByTicketId/${id}`);
                setComments(response.data);
                setCommentsLoading(false);
            } catch (error) {
                console.log(error);
                setCommentsError(error.response.data);
                setCommentsLoading(false);
            }
        }

        fetchComment();
        fetchUser();
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
            {userLoading && !userError && <h3>Loading...</h3>}
            {!userLoading && userError && <h3>An unexpected error has occurred</h3>}
            {!userLoading && !userError && <h3>Created by: {user.username}</h3>}
            <h2>{title}</h2>
            <p>{content}</p>
            <div>
                {commentsLoading && !commentsError && <h4>Loading...</h4>}
                {!commentsLoading && commentsError && <h4>No comments yet</h4>}
                {!commentsLoading && !commentsError &&
                    <>
                        <h4>Comments:</h4>
                        {comments.map((comment, index) => (
                            <Comment
                                key={index}
                                id={comment.id}
                                userid={comment.userid}
                                content={comment.data}
                                likes={comment.likes}
                                dislikes={comment.dislikes}
                            />
                        ))}
                    </>
                }
            </div>
            {(userData.id != 0) &&
                <>
                    <div>
                        <input
                            placeholder="Add a comment..."
                            type="text"
                            value={newCommentData}
                            required
                            onChange={handleCommentChange}
                            style={{
                                width: "100%",
                                height: "50px",
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "10px 0px",
                            }}
                        />
                        <button
                            onClick={handlePost}
                            style={{
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                borderRadius: "5px",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                                margin: "0px 5px",
                            }}
                        >
                            Add Comment
                        </button>
                    </div>
                </>
            }
        </div>
    );
};

export default Thread;
