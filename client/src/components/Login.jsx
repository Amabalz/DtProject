import { useContext, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginMessage, setLoginMessage] = useState('Login failed');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        setLoginMessage('Login failed');

        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:7082/User/Login',
            data: {
                email: formData.email,
                password: formData.password
            }
        })
        .then(function (response) {
            console.log(response);

            axios({
                method: 'get',
                url: `http://localhost:7082/GetBan/${response.data.id}`
            })  
            .then(function (banResponse){
                console.log(banResponse);
                setLoginMessage("Login failed - User is banned");
            })
            .catch(function (banError){
                setUserData({
                "id": response.data.id,
                "username": response.data.username,
                "email": response.data.email
                });

                localStorage.setItem("id", response.data.id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("email", response.data.email);

                setFormData({
                    email: '',
                    password: ''
                });
                setLoginMessage("Login successful");
                navigate('/');
            })
        })
        .catch(function (error) {
            console.log(error.response.data);
            setLoginMessage("Invalid credentials");
        })
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
            }}
        >
            <form onSubmit={handleSubmit} noValidate>
                <h5>Login</h5>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmailLogin"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="inputPasswordLogin"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Popup trigger=
                    {
                        <button
                            type="submit"
                            className="btn btn-dark"
                            style={{ position: "relative" }}
                        >
                            Login
                        </button>
                    }
                    position="left">
                    <div>{loginMessage}</div>
                </Popup>
            </form>
        </div>
    );
}

export default Login;
