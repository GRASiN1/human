import React, { useState } from "react";
import style from "./tracker.module.css";
import Navbar from "../navbar/navbar";
import Loader from "../loader/loader";

export default function Tracker() {
  const [isGoalVisible, setIsGoalVisible] = useState(true);
  const [goal, setGoal] = useState(""); // State to store the new goal
  const [data, setData] = useState([]); // State to store tasks
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index
  const [isLoading, setIsLoading] = useState(false); // State for loader visibility
  const [error, setError] = useState(""); // State for error messages

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  const token = getCookie('token');
  console.log("Token:", token); // For debugging

  // Handle goal creation
  // Handle goal creation
async function handleCreate() {
  if (!goal.trim()) {
    setError("Goal cannot be empty");
    return;
  }

  setIsLoading(true); // Show loader while fetching
  setError(""); // Clear previous errors

  try {
    const response = await fetch("http://localhost:5000/api/health/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        'sessionToken': `${localStorage.getItem('sessionToken')}`,
      },
      body: JSON.stringify({ goal })
    });

    console.log("Response Status:", response.status); // Log response status
    console.log("Response Headers:", response.headers); // Log response headers

    const result = await response.json();
    console.log("Response Body:", result.data.response[0]); // Log response body

    if (response.ok) {
      alert("Goal created successfully!");
      setGoal(""); // Clear input field

      // Transform response data dynamically
      const tasks = Object.entries(result.data.response[0]).map(([day, data]) => ({
        day,
        ...data // Spread operator to include all properties dynamically
      }));

      setData(tasks); // Store tasks locally
      setCurrentIndex(0); // Start with the first item
    } else {
      setError(result.message || "Error occurred while creating goal.");
    }
  } catch (error) {
    console.error("Error creating goal:", error);
    setError("Something went wrong. Please try again later.");
  } finally {
    setIsLoading(false); // Hide loader in either case
  }
}

// Handle showing roadmap
async function handleRoadMap() {
  setIsGoalVisible(false);

  // Fetch data when entering the roadmap view
  setIsLoading(true); // Show loader while fetching
  setError(""); // Clear previous errors

  try {
    const response = await fetch("http://localhost:5000/api/health/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        'sessionToken': `${localStorage.getItem('sessionToken')}`,
      },
    });

    console.log("Response Status:", response.status); // Log response status
    console.log("Response Headers:", response.headers); // Log response headers

    const result = await response.json();
    console.log("Response Body:", result.data.response[0]); // Log response body

    if (response.ok) {
      // Transform response data dynamically
      const tasks = Object.entries(result.data.response[0]).map(([day, data]) => ({
        day,
        ...data // Spread operator to include all properties dynamically
      }));

      setData(tasks); // Store tasks locally
      setCurrentIndex(0); // Start with the first item
    } else {
      setError(result.message || "Error occurred while fetching roadmap.");
    }
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    setError("Something went wrong. Please try again later.");
  } finally {
    setIsLoading(false); // Hide loader in either case
  }
}

  // Handle showing goal input
  function handleSetGoals() {
    setIsGoalVisible(true);
  }

  // Handle showing roadmap
  function handleRoadMap() {
    setIsGoalVisible(false);
  }

  // Handle checking task
  function handleCheck() {
    // Move to the next task
    setCurrentIndex(prevIndex => prevIndex + 1);
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
              {isLoading ? (
                <Loader /> // Show loader while loading or processing
              ) : (
                <>
                  {error && <p className={style.error}>{error}</p>} {/* Show error messages */}
                  {data.length > 0 && currentIndex < data.length ? (
                    <div className={style.card}>
                      <p>Todays Task: {data[currentIndex].routine}</p>
                      <p>Todays Task: {data[currentIndex].tip}</p>
                      <button onClick={handleCheck} className={style.button}>Check</button>
                    </div>
                  ) : (
                    currentIndex >= data.length ? (
                      <p>No more items to load.</p> // Message for no more items
                    ) : (
                      <Loader /> // Message for no data case
                    )
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
