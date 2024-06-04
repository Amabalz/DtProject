import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { UserContext } from './Context';

const Comment = ({ userid, content, likes, dislikes, id }) => {
    const { userData, setUserData } = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);


    const deleteComment = () => {
        axios.delete(`http://localhost:7082/DeleteComment/${id}`)
            .then(function (response) {
                console.log("Comment deleted");
            })
            .catch(function (error) {
                console.log(error);
            });
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

        fetchUser();
    }, []);

    const handleLike = async () => {
        try {
            await axios.get(`http://localhost:7082/LikeCommentById/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDislike = async () => {
        try {
            await axios.get(`http://localhost:7082/DislikeCommentById/${id}`);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div
            className="comment"
            style={{
                background: "white",
                margin: "10px 10px 10px 10px",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
            }}
        >
            {userLoading && !userError && <p>Loading...</p>}
            {!userLoading && userError && <p>An unexpected error has occurred</p>}
            {!userLoading && !userError && <p>{user.username} commented:</p>}
            <p>{content}</p>
            <div className="buttons">
                <button className="like-button" onClick={handleLike}>
                    Like ({likes})
                </button>
                <button className="dislike-button" onClick={handleDislike}>
                    Dislike ({dislikes})
                </button>
                {(userid == userData.id) &&
                    <button className="dislike-button" onClick={deleteComment}>
                        Delete
                    </button>
                }
            </div>
        </div>
    );
};

export default Comment;
