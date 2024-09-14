import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import style from "./homepage.module.css";
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import Features from "../features/feature";
import { useUser } from "../../UserContext"; // Correct import

export default function HomePage() {

    let features = [
        { image: '/images/5.jpg' },
        { image: 'images/1.jpg' },
        { image: 'images/2.jpg' },
        { image: 'images/3.jpg' },
        { image: 'images/4.jpg' },
    ];

    const { user } = useUser(); // Correct usage
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Static card data
        const staticCards = [
            { title: 'ACADEMIC', progress: 50, logo: '/images/academicLogo.png' },
            { title: 'FINANCE', progress: 75, logo: '/images/financeLogo.png' },
            { title: 'HEALTH', progress: 90, logo: '/images/healthLogo.png' },
        ];
        setCards(staticCards);
    }, []);

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
