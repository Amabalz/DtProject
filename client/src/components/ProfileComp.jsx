import { useContext, useEffect, useState } from "react";
import { UserContext } from './Context';
import axios from 'axios';
function ProfileComp({ avatar }) {
    const [newAvatar, setNewAvatar] = useState(null);
    const { userData, setUserData } = useContext(UserContext);
    const [allUserData, setAllUserData] = useState([]);

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        setNewAvatar(URL.createObjectURL(file));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:7082/User/GetUser/${userData.id}`);
                setAllUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div style={styles.profileCard}>
            <img src={newAvatar || avatar} style={styles.profileAvatar} />
            <div style={styles.profileInfo}>
                <h2 style={styles.username}>{userData.username}</h2>
                <p>Email: {userData.email}</p>
                <p>Role: {allUserData.role}</p>
                <p>Level: {allUserData.level}</p>
                <label>Change Avatar:</label>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
            </div>
        </div>
    );
}

const styles = {
    profileCard: {
        border: "1px solid black",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "20px auto",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    profileCardHover: {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    profileAvatar: {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        marginRight: "20px",
        objectFit: "cover",
    },
    profileInfo: {
        display: "flex",
        flexDirection: "column",
    },
    username: {
        margin: "0 0 10px",
        color: "#007bff",
    },
    loading: {
        fontSize: "20px",
        color: "#007bff",
        textAlign: "center",
        padding: "50px",
    },
};

export default ProfileComp;
