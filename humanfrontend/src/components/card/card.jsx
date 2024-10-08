import React from "react";
import style from "./card.module.css";
import RadialProgressBar from "../progressbar/progressbar"

export default function Card(props) {
  return (
    <div className={style.card} onClick={props.onClick}>
      <div className={style.progressContainer}>
        {/* <div className={style.progressCircle}
        style={{ background: `conic-gradient(red ${props.progress * 1.8}deg, grey ${ props.progress * 1.8 }deg)`}}>
          <div className={style.progressText}>{props.progress}%</div>
        </div> */}
        <RadialProgressBar value={60} 
        maxValue={100} 
        size={150} 
        strokeWidth={20} 
        color="#FF5733"/>
      </div>
      <div className={style.cardTitle}>
        <h3>{props.title}</h3>
        <img src={props.logo} alt={ props.title } className={style.image}/>
      </div>
    </div>
  );
}
