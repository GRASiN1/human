import logo from "./logo.png";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import React from 'react';
import { useUser } from "../../UserContext";

export default function Navbar(props) {

    const { user, logout } = useUser();

    return (
        <nav className={style.navbar}>
            <div className={style.brandLogo}>
                <Link to="/"><img src={logo} alt="brandLogo" className={style.logo}/></Link>
            </div>
            {user ? 
            <div className={style.userHandle}>
                <Link to="/profile"><img src={user.profileImage ? user.profileImage : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"} alt="profile of user" className={style.profileImage} onClick={logout}/></Link>
            </div>
            :
            <div className={style.authenticate}>
                <Link to="/authenticate" className={style.button}>Login | Signup</Link>
            </div>}
        </nav>
    );
}
