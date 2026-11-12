
import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Auth({ onAuthenticated }) {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (isSignup && form.password.length < 8) {
            setError("Your password must contain at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const endpoint = isSignup ? "register" : "login";

            const payload = isSignup
                ? {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password
                }
                : {
                    email: form.email.trim(),
                    password: form.password
                };

            const response = await axios.post(
                `${API_BASE_URL}/api/auth/${endpoint}`,
                payload
            );

            setSuccess(response.data.message);
            onAuthenticated(response.data);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        setError("");
        setSuccess("");
        setForm({ name: "", email: "", password: "" });
    };

    return (
        <div className="auth-page">
            <div className="auth-decoration auth-decoration-one"></div>
            <div className="auth-decoration auth-decoration-two"></div>

            <div className="auth-card">
                <div className="auth-brand">
                    <span className="auth-brand-name">StyleSync</span>
                    <span className="auth-brand-tagline">
                        YOUR STYLE, YOUR SPACE
                    </span>
                </div>

                <div className="auth-heading">
                    <p className="auth-eyebrow">
                        A LITTLE SPACE FOR YOUR STYLE
                    </p>

                    <h1>
                        {isSignup
                            ? "Create your account."
                            : "Welcome back."}
                    </h1>

                    <p>
                        {isSignup
                            ? "Let's make your wardrobe feel like yours."
                            : "Your wardrobe is waiting for you."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {isSignup && (
                        <div className="auth-field">
                            <label htmlFor="auth-name">Your name</label>
                            <input
                                id="auth-name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange}
                                maxLength={60}
                                required
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="auth-email">Email address</label>
                        <input
                            id="auth-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="auth-password">Password</label>
                        <input
                            id="auth-password"
                            type="password"
                            name="password"
                            placeholder="At least 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            minLength={8}
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-message auth-error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="auth-message auth-success">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isSignup
                                ? "Create my account"
                                : "Log in"}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>
                        {isSignup
                            ? "Already have an account?"
                            : "New to StyleSync?"}
                    </span>

                    <button type="button" onClick={switchMode}>
                        {isSignup ? "Log in" : "Create an account"}
                    </button>
                </div>

                <p className="auth-footer">
                    MADE WITH LOVE FOR YOUR EVERYDAY STYLE
                </p>
            </div>
        </div>
    );
}

export default Auth;
