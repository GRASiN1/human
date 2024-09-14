import React from "react";
import style from "./card.module.css";

export default function Card(props) {
  return (
    <div className={style.card} onClick={props.onClick}>
      <div className={style.progressContainer}>
        <div className={style.progressCircle}
        style={{ background: `conic-gradient(red ${props.progress * 1.8}deg, grey ${ props.progress * 1.8 }deg)`}}>
          <div className={style.progressText}>{props.progress}%</div>
        </div>
      </div>
      <div className={style.cardTitle}>
        <h3>{props.title}</h3>
        <img src={props.logo} alt={ props.title } />
      </div>
    </div>
  );
}
