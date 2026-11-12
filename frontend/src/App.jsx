
import { useState } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("stylesync-token");
        const savedUser = localStorage.getItem("stylesync-user");

        if (!token || !savedUser) return null;

        try {
            return {
                token,
                user: JSON.parse(savedUser)
            };
        } catch {
            localStorage.removeItem("stylesync-token");
            localStorage.removeItem("stylesync-user");
            return null;
        }
    });

    const handleAuthenticated = (data) => {
        localStorage.setItem("stylesync-token", data.token);
        localStorage.setItem(
            "stylesync-user",
            JSON.stringify(data.user)
        );

        setAuth({
            token: data.token,
            user: data.user
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("stylesync-token");
        localStorage.removeItem("stylesync-user");
        setAuth(null);
    };

    if (!auth) {
        return <Auth onAuthenticated={handleAuthenticated} />;
    }

    return (
        <Home
            token={auth.token}
            user={auth.user}
            onLogout={handleLogout}
        />
    );
}

export default App;
