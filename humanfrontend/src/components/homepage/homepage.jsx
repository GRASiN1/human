import React from "react";
import Navbar from "../navbar/navbar";
import style from "./homepage.module.css";
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import Features from "../features/feature";
import { useUser } from "../../UserContext";

export default function HomePage() {
    let features = [
        { image: '/images/5.jpg' },
        { image: 'images/1.jpg' },
        { image: 'images/2.jpg' },
        { image: 'images/3.jpg' },
        { image: 'images/4.jpg' },
    ];

    const { user, setUser } = useUser();  // Using object destructuring
    const navigate = useNavigate();

    // Static cards data
    const cards = [
        { title: "ACADEMIC", progress: 80, logo: '/images/academic.png' },
        { title: "FINANCE", progress: 60, logo: '/images/finance.png' },
        { title: "HEALTH", progress: 50, logo: '/images/health.png' },
    ];

    function handleClick(url) {
        const formattedTitle = url.replace(/\s+/g, '-').toLowerCase();
        navigate(`/tracker/${formattedTitle}`);
    }

    return (
        <div className={style.body}>
            <Navbar />
            {user ? 
                <div className={style.content}>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            progress={card.progress}
                            title={card.title}
                            logo={card.logo}
                            onClick={() => handleClick(card.title)}
                        />
                    ))}
                </div>
                :
                <div className={style.contentNoUser}>
                    <Features features={features} />
                </div>
            }
        </div>
    );
}
