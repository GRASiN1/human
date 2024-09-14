import React, { useState, useEffect } from "react";
import style from "./tracker.module.css";
import Navbar from "../navbar/navbar";
import Loader from "../loader/loader";

export default function Tracker(props) {
  const [isGoalVisible, setIsGoalVisible] = useState(true);
  const [goal, setGoal] = useState(""); // State to store the new goal
  const [data, setData] = useState([]); // State to store tasks
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  async function handleCreate() {
    if (!goal.trim()) {
      alert("Goal cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/health/", { // Replace with your endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
        body: JSON.stringify({
          goal,
          sessionToken: localStorage.getItem('sessionToken') // Include sessionToken in the request body
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Goal created successfully!");
        setGoal(""); // Clear input field
        
        // Assuming `result.response` contains the tasks array
        setData(result.response || []); // Store tasks locally
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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'sessionToken': `${localStorage.getItem('sessionToken')}`,
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

  // Convert the data object to an array of days
  const days = Object.keys(data[0] || {}).map(dayKey => ({
    day: dayKey,
    tip: data[0][dayKey].tip
  }));

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
                placeholder="Achieve this in X days"
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
              {days.length > 0 ? (
                <div>
                  <p>{days[currentIndex].day}: {days[currentIndex].tip}</p>
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
