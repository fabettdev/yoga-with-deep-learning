import React, { useState } from "react";
import "./workout.css";

import Status from "../../components/custom/status/Status";
import Webcam from "../../components/custom/webcam/Webcam";

import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

function Workout() {
  const [state, setState] = useState({
    isWorkingOut: false,
    currentExercise: null,
    hasWorkoutEnded: false,
  });

  const navigate = useNavigate();

  const workoutExercises = ["Tadasana", "Virabhadrasana II", "Kumbhakasana"];

  function startWorkout() {
    setState({
      ...state,
      isWorkingOut: true,
      currentExercise: workoutExercises[0],
    });
  }

  function endWorkout() {
    setState({
      ...state,
      isWorkingOut: false,
      currentExercise: null,
      hasWorkoutEnded: true,
    });
  }

  function nextExercise(index) {
    if (index >= workoutExercises.length) {
      return endWorkout();
    }

    setState({
      ...state,
      currentExercise: workoutExercises[index],
    });
  }

  function goToHomepage() {
    navigate("/");
  }

  return (
    <div className="workout">
      <div className="webcam">
        <Webcam
          currentExercise={state.currentExercise}
          videoWidth={900}
          videoHeight={(900 / 4) * 3}
        />
      </div>
      <div className="info">
        <div>
          {!!state.isWorkingOut && (
            <>
              <Status
                exercises={workoutExercises}
                nextExercise={nextExercise}
                restDuration={10}
                workoutDuration={15}
              />
              <img
                src={require(`../../assets/images/${state.currentExercise}.png`)}
              />
            </>
          )}

          {!state.isWorkingOut && !state.hasWorkoutEnded && (
            <Button handleClick={startWorkout} label="Let's workout!" />
          )}

          {!state.isWorkingOut && !!state.hasWorkoutEnded && (
            <>
              <h2>Great job! You've completed the workout</h2>
              <div className="actions">
                <Button handleClick={startWorkout} label="Repeat workout!" />
                <Button
                  handleClick={goToHomepage}
                  label="Back to workout list!"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workout;
