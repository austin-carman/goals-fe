import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import GoalCard from "./GoalCard";

const GoalList = () => {
  const [goals, setGoals] = useState([]); //eslint-disable-line
  const location = useLocation();
  const { userId } = location.state;

  useEffect(() => {
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${userId}`)
      .then((res) => {
        setGoals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Goal List</h2>
      <GoalCard />
    </div>
  );
};

export default GoalList;
