import React, { useState } from "react";
import style from "./authenticate.module.css";

export default function Authenticate() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSwitchChange = () => {
        setIsSignup(!isSignup);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost" + isSignup ? "/api/auth/signup" : "/api/auth/login"; // Replace with your backend URL
        const method = isSignup ? "POST" : "POST"; // Typically, signup and login both use POST

        const requestData = isSignup
            ? { name: formData.name, email: formData.email, password: formData.password }
            : { email: formData.email, password: formData.password };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (response.ok) {
                const { token, user } = result;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                alert(isSignup ? "Sign up successful!" : "Login successful!");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.formArea}>
                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className={`${style.signupFormArea} ${isSignup ? '' : style.hide}`}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className={style.input}
                        required={isSignup} // Name is required only for signup
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={style.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className={style.input}
                        required
                    />
                    <button type="submit" className={style.button}>Sign Up</button>
                </form>

                {/* Log In Form */}
                <form onSubmit={handleSubmit} className={`${style.loginFormArea} ${isSignup ? style.hide : ''}`}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={style.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className={style.input}
                        required
                    />
                    <button type="submit" className={style.button}>Log In</button>
                </form>

                {/* Switch between forms */}
                <div className={style.switchdiv}>
                    <span className={style.text}>Login</span>
                    <label className={style.switch}>
                        <input 
                            type="checkbox" 
                            checked={isSignup} 
                            onChange={handleSwitchChange} 
                        />
                        <span className={`${style.slider} ${style.round}`}></span>
                    </label>
                    <span className={style.text}>Signup</span>
                </div>
            </div>
        </div>
    );
}
