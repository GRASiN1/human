import React, { useState, useEffect } from "react";
import style from "./tracker.module.css";
import Navbar from "../navbar/navbar";
import Loader from "../loader/loader";

export default function Tracker(props) {
  const [isGoalVisible, setIsGoalVisible] = useState(true);
  const [goal, setGoal] = useState(""); // State to store the new goal
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost/api/roadmap");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function handleCreate() {
    if (!goal.trim()) {
      alert("Goal cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost/api/roadmap/goals", { // Replace with your endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
        body: JSON.stringify({ goal })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Goal created successfully!");
        setGoal(""); // Clear input field
        // Optionally, refetch or update your state to reflect the new goal
        setData(prevData => [...prevData, result]);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  function handleSetGoals() {
    setIsGoalVisible(true);
  }

  function handleRoadMap() {
    setIsGoalVisible(false);
  }

  function handleCheck() {
    if (data.length > 0 && currentIndex < data.length) {
      // Mark the current task as completed
      try {
        const task = data[currentIndex];
        fetch(`http://localhost/api/roadmap/${task.id}/complete`, { // Adjust endpoint as necessary
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        setCurrentIndex(currentIndex + 1);
      } catch (error) {
        console.error("Error marking task as completed:", error);
      }
    } else {
      alert("No more items to load!");
    }
  }

  return (
    <div className={style.body}>
      <Navbar />
      <div className={style.content}>
        <div className={style.options}>
          <div className={style.form} onClick={handleSetGoals}>
            <h3>Set Goals</h3>
          </div>
          <div className={style.list} onClick={handleRoadMap}>
            <h3>RoadMap</h3>
          </div>
        </div>
        <div className={style.result}>
          {isGoalVisible && (
            <div className={style.formResult}>
              <input
                type="text"
                placeholder="Goal"
                className={style.input}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <button type="submit" className={style.button} onClick={handleCreate}>
                Create
              </button>
            </div>
          )}

          {!isGoalVisible && (
            <div className={style.listResult}>
              {data.length > 0 ? (
                <div>
                  <p>Current Item: {data[currentIndex].title}</p>
                  <button onClick={handleCheck} className={style.button}>Check and Load Next</button>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
