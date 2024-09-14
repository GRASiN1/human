import React from "react";
import Navbar from "../navbar/navbar";
import style from "./homepage.module.css";
import Card from "../card/card"
import { useNavigate } from "react-router-dom"
import Features from "../features/feature";
import { useUser } from "../../UserContext";
// eslint-disable-next-line

export default function HomePage(props){
    // eslint-disable-next-line
    const [ user, setUser ] = useUser();

    const Navigation = useNavigate();
    function handleClick(url){
        const formattedTitle = url.replace(/\s+/g, '-').toLowerCase();
        Navigation(`/tracker/${formattedTitle}`);
    }

    let features=[
        {
            // image:'https://drive.google.com/uc?id=1dJxNEolgh9RBByrsLg10pbcxVbTFUNgS',
            image:'/images/5.jpg'
        },
        {
            image:'images/1.jpg',
        },
        {
            image:'images/2.jpg',
        },
        {
            image:'images/3.jpg',
        },
        {
            image:'images/4.jpg',
        },
    ]

    return(
        <div className={style.body}>
            <Navbar/>
            {user ? 
            <div className={style.content}>
            <Card progress={100} title="ACADEMICS" onClick={() => handleClick("ACADEMIC")} />
            <Card progress={100} title="FINANCE" onClick={() => handleClick("FINANCE")} />
            <Card progress={100} title="HEALTH" onClick={() => handleClick("HEALTH")} />
            </div>
            :
            <div className={style.contentNoUser}>
                <Features features={features}/>
            </div>
            }
        </div>
    )
}