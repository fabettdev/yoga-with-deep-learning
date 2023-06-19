import { Routes, Route } from "react-router-dom";
import Cms from "../pages/cms/Cms";
import Home from "../pages/home/Home";
import Workout from "../pages/workout/Workout";

function Routing() {
  return (
    <Routes>
      <Route path="" element={<Cms />}>
        <Route path="" element={<Home />} />
        <Route path="workout" element={<Workout />} />
      </Route>
    </Routes>
  );
}

export default Routing;
