import React from "react";
import { useParams, useLocation } from "react-router-dom";
const EditGoal = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <div>
      <h2>Edit Goal {params.goalId}</h2>
      <p>{location.state.goal.goal_title}</p>
    </div>
  );
};

export default EditGoal;
