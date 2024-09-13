import React from "react";
import Navbar from "../navbar/navbar";
import style from "./homepage.module.css";
// eslint-disable-next-line
let user = {
    name: "Abhinav",
    profileImage: 'https://preview.redd.it/high-quality-transparent-versions-of-the-default-avatars-v0-nmbxnhh4nica1.png?width=256&format=png&auto=webp&s=7ba3475861fde9307ca1ff7c7e01c38db3ef8862',
}

export default function HomePage(){
    return(
        <div className={style.body}>
            <Navbar user={null}/>

        </div>
    )
}