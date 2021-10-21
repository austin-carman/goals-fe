import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
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
    </div>
  );
};

export default GoalList;
