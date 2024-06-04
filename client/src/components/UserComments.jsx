import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { UserContext } from './Context';

const UserComments = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/GetCommentByUserId/${userData.id}`);
                setComments(response.data);
                setCommentsLoading(false);
            } catch (error) {
                console.log(error);
                setCommentsError(error.response.data);
                setCommentsLoading(false);
            }
        };

        fetchComments();
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
            {commentsLoading && !commentsError && <h3>Loading...</h3>}
            {!commentsLoading && commentsError && <h3>No comments posted yet</h3>}
            {!commentsLoading && !commentsError &&
                <>
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                        >
                            <h2>Comment no: {index+1}</h2>
                            <p>{comment.data}</p>
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

export default UserComments;
