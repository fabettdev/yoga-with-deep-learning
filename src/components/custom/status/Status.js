import React, { useState, useEffect, useRef } from "react";
import "./status.css";

function Status(props) {
  const [state, setState] = useState({
    rest: true,
    timer: props.restDuration,
    index: 0,
  });

  const initialTimerRef = useRef(new Date());

  const currentText = !!state.rest ? `Rest` : props.exercises[state.index];

  const nextText = !!state.rest
    ? `Next: ${props.exercises[state.index]}`
    : `Next: ${props.exercises[state.index + 1] ?? "End of workout"}`;

  useEffect(() => {
    const stateClone = { ...state };

    const countdown = !!state.rest ? props.restDuration : props.workoutDuration;

    const curr = new Date();

    stateClone.timer =
      countdown - (curr.getTime() - initialTimerRef.current.getTime()) / 1000;

    // Se il lavoro è finito
    if (!state.rest && state.timer <= 0) {
      initialTimerRef.current = new Date();
      stateClone.timer = props.restDuration;
      stateClone.rest = true;
      stateClone.index += 1;

      props.nextExercise(stateClone.index);
    }

    // Se il rest è finito
    if (!!state.rest && state.timer <= 0) {
      initialTimerRef.current = new Date();
      stateClone.timer = props.workoutDuration;
      stateClone.rest = false;
    }

    const timerInterval = setInterval(function () {
      setState(stateClone);
    }, 1);

    return () => clearInterval(timerInterval);
  }, [state.timer]);

  return (
    <div className="status">
      <div className="timer">{Math.ceil(state.timer)}</div>

      <div className="exercises">
        <div className="current">{currentText}</div>
        <div className="next">{nextText}</div>
      </div>
    </div>
  );
}

export default Status;
