import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const GoalList = () => {
  const [goals, setGoals] = useState([]); //eslint-disable-line
  const location = useLocation();
  const { userId } = location.state;
  console.log(goals);
  console.log(userId);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${userId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Goal List</h2>
    </div>
  );
};

export default GoalList;
