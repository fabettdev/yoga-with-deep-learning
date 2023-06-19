import React from "react";
import "./card.css";

import Button from "../../ui/button/Button";

import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  function handleNavigate() {
    if (!props.item?.path) return;
    navigate(props.item?.path);
  }

  return (
    <article className="card">
      <div
        className="image"
        style={{ backgroundImage: `url(${props.item?.image})` }}
      ></div>
      <div className="detail">
        <h3>{props.item?.name}</h3>
        <Button handleClick={handleNavigate} label="Let's do it" />
      </div>
    </article>
  );
}

export default Card;
