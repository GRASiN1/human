import React from "react";
import logo from "./logo.png";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <nav className={style.navbar}>
            <div className={style.brandLogo}>
                <Link to="/"><img src={logo} alt="brandLogo" className={style.logo}/></Link>
            </div>
            {props.user ? 
            <div className={style.userHandle}>
                <Link to="/profile"><img src={props.user.profileImage} alt="profile of user" className={style.profileImage}/></Link>
            </div>
            :
            <div className={style.authenticate}>
                <Link to="/authenticate" className={style.button}>Login | Signup</Link>
            </div>}
        </nav>
    );
}
