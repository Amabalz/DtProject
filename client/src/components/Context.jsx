import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        "id": 0,
        "username": "",
        "email": ""
    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };