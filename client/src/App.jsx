import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProfilePageThreads from "./components/ProfilePageThread";
import ProfilePageComm from "./components/ProfilePageComm";
import { useContext, useEffect } from "react";
import { UserContext } from './components/Context';

function App() {
    const { setUserData } = useContext(UserContext);

    const handleLocalStorage = () => {
        if (localStorage.length <= 0) {
            localStorage.setItem("id", 0);
            localStorage.setItem("username", "");
            localStorage.setItem("email", "");
        } else {
            setUserData({
                "id": localStorage.getItem("id"),
                "username": localStorage.getItem("username"),
                "email": localStorage.getItem("email")
            });
        }
    }

    useEffect(() => {
        handleLocalStorage();
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/threads" element={<ProfilePageThreads />} />
                <Route path="/comments" element={<ProfilePageComm />} />
            </Routes>
        </Router>
    );
}

export default App;
