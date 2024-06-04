import { useState, useEffect } from "react";
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [bannedUsers, setBannedUsers] = useState([]);

    const handleBanUser = (userId, userEmail) => {
        axios({
            method: 'post',
            url: 'http://localhost:7082/AddBan',
            data: {
                id: userId,
                email: userEmail,
                reason: "You are not following the rules imposed by the site"
            }
        })
        .then(function (response) {
            console.log("User banned")
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
    };

    const handleUnbanUser = (userId) => {
        axios({
            method: 'delete',
            url: `http://localhost:7082/DeleteBan/${userId}`
        })
            .then(function (response) {
                console.log("User unbanned")
            })
            .catch(function (error) {
                console.log(error.response.data);
            })
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:7082/User/GetAllUsers');
                setUsers(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        };

        const fetchBans = async () => {
            try {
                const response = await axios.get('http://localhost:7082/GetAllBans');
                const bans = response.data.map(ban => ban.id);
                setBannedUsers(bans);
            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchBans();
        fetchUsers();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Admin Dashboard</h1>
            <section style={styles.section}>
                <h2 style={styles.subHeader}>Active Users</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>User</th>
                            <th style={styles.tableHeader}>Mail</th>
                            <th style={styles.tableHeader}>Reputation</th>
                            <th style={styles.tableHeader}>Role</th>
                            <th style={styles.tableHeader}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user, index) => (bannedUsers.indexOf(user.id) == -1 && user.role != "admin"))
                            .map((user, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{user.username}</td>
                                <td style={styles.tableCell}>{user.email}</td>
                                <td style={styles.tableCell}>{user.level}</td>
                                <td style={styles.tableCell}>{user.role}</td>
                                <td style={styles.tableCell}>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleBanUser(user.id, user.email)}
                                    >
                                        Ban
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section style={styles.section}>
                <h2 style={styles.subHeader}>Banned Users</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>User</th>
                            <th style={styles.tableHeader}>Mail</th>
                            <th style={styles.tableHeader}>Reputation</th>
                            <th style={styles.tableHeader}>Role</th>
                            <th style={styles.tableHeader}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user, index) => (bannedUsers.indexOf(user.id) != -1 && user.role != "admin"))
                            .map((user, index) => (
                                <tr key={index} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{user.username}</td>
                                    <td style={styles.tableCell}>{user.email}</td>
                                    <td style={styles.tableCell}>{user.level}</td>
                                    <td style={styles.tableCell}>{user.role}</td>
                                    <td style={styles.tableCell}>
                                        <button
                                            style={styles.button}
                                            onClick={() => handleUnbanUser(user.id)}
                                        >
                                            Unban
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

/* CSS aici, iar */
const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#34495E",
    },
    subHeader: {
        textAlign: "center",
        marginBottom: "10px",
        color: "#2C3E50",
    },
    section: {
        marginBottom: "40px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
    },
    tableHeader: {
        backgroundColor: "#34495E",
        color: "#ECF0F1",
        padding: "10px",
        border: "1px solid #ddd",
    },
    tableRow: {
        backgroundColor: "#f9f9f9",
        transition: "background-color 0.3s",
    },
    tableCell: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#c0392b",
    },
};

export default Dashboard;
