import React, { useState, useEffect } from "react";
import style from "./tracker.module.css";
import Navbar from "../navbar/navbar";
import Loader from "../loader/loader";

export default function Tracker(props) {
  // State to control which section is visible
  const [isGoalVisible, setIsGoalVisible] = useState(true);

  // State to store fetched data and the current item index
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from the backend when the component loads
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

  function handleSetGoals() {
    setIsGoalVisible(true);
  }

  // Show the RoadMap and hide the Set Goals form
  function handleRoadMap() {
    setIsGoalVisible(false);
  }

  // Logic for "checking" the current item and loading the next one
  function handleCheck() {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next item
    } else {
      alert("No more items to load!"); // Or you could handle differently
    }
  }

  function handleCreate() {}

  return (
    <div className={style.body}>
      <Navbar user={null} />
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
          {/* Set Goals Form */}
          {isGoalVisible && (
            <div className={style.formResult}>
              <input type="text" placeholder="Goal" className={style.input} />
              <button type="submit" className={style.button} onClick={handleCreate}>
                Create
              </button>
            </div>
          )}

          {/* RoadMap */}
          {!isGoalVisible && (
            <div className={style.listResult}>
              {/* Check if there's data to display */}
              {data.length > 0 ? (
                <div>
                  <div className="card">
                  <p>Current Item: {data[currentIndex]}</p>
                  </div>
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
