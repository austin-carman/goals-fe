import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import GoalCard from "./GoalCard";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const location = useLocation();
  // const { userId } = location.state;
  const params = useParams();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://goalmanager.herokuapp.com/api/goals/${params.userId}`)
      .then((res) => {
        setGoals(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        goals.map((goal) => {
          return <GoalCard key={goal.goal_id} goal={goal} />;
        })
      )}
    </div>
  );
};

export default GoalList;
