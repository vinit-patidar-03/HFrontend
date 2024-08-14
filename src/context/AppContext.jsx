import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

const AppContext = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("HeliverseToken")) {
            getUser()
        } else {
            navigate('/login');
        }
    }, [navigate])

    const getUser = async () => {
        try {
            const res = await axios.get("https://h-backend-three.vercel.app/api/v1/user", {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("HeliverseToken")
                }
            })
            setUser(res.data.user);
        } catch (error) {
            throw new Error("Internal Server Error");
        }
    }
    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext