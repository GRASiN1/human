import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import style from "./homepage.module.css";
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import Features from "../features/feature";
import { useUser } from "../../UserContext";

export default function HomePage() {

    let features=[
        {
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

  const [user, setUser] = useUser();
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cards'); // Replace with your API endpoint
        const data = await response.json();
        
        const updatedCards = await Promise.all(data.map(async card => {
          const response = await fetch(`http://localhost:5000/api/cards/${card.id}/tasks`);
          const tasks = await response.json();
          const completedTasks = tasks.filter(task => task.completed).length;
          const progress = (completedTasks / tasks.length) * 100;
          return { ...card, progress };
        }));
        
        setCards(updatedCards);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
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
              logo={card.logo} // Ensure you have the `logo` in your card data
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
