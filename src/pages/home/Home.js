import React from "react";
import Collection from "../../components/custom/collection/Collection";

import wakeUpCallImage from "../../assets/images/yoga.png";

const workoutObj = {
  name: "wake up call",
  image: wakeUpCallImage,
  path: "workout",
};

const collectionArray = Array(10).fill(workoutObj);

function Home() {
  return (
    <div>
      <Collection array={collectionArray} />
    </div>
  );
}

export default Home;
