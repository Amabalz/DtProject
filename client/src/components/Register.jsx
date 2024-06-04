import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [registerMessage, setRegisterMessage] = useState('Register failed');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        setRegisterMessage("Register failed")
        e.preventDefault();
        const data = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        axios.post('http://localhost:7082/User/AddUser', data)
        .then(function (response) {
            console.log(response);
            setRegisterMessage("User was registered");

            // Clear the form
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        })
        .catch(function (error) {
            console.log(error.response.data);
            setRegisterMessage("Invalid data");
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
                <h5>Register</h5>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="inputUsernameRegister"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmailRegister"
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
                        id="inputPasswordRegister"
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
                            Register
                        </button>
                    }
                    position="left">
                    <div>{registerMessage}</div>
                </Popup>
            </form>
        </div>
    );
}

export default Register;
