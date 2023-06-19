import React, { useState } from "react";
import "./collection.css";

import Card from "../card/Card";

function Collection(props) {
  const [state, setState] = useState({
    index: 0,
  });

  function mapCards(item, index) {
    return (
      <li key={index}>
        <Card item={props.array[index]} />
      </li>
    );
  }

  function handleNext() {
    let index = state.index;

    if (index + 1 >= props.array.length / 5) {
      index = 0;
    } else {
      index += 1;
    }

    setState({
      ...state,
      index,
    });
  }

  function handlePrev() {
    let index = state.index;

    if (index - 1 < 0) {
      index = props.array.length / 5 - 1;
    } else {
      index -= 1;
    }

    setState({
      ...state,
      index,
    });
  }

  return (
    <div className="collection">
      <header>
        <h2>Beginner</h2>
        <div className="actions">
          <div className="prev" onClick={handlePrev}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="next" onClick={handleNext}>
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </header>
      <div className="slider-container">
        <ul style={{ transform: `translateX(calc(-100% * ${state.index}))` }}>
          {props.array.map(mapCards)}
        </ul>
      </div>
    </div>
  );
}

export default Collection;
