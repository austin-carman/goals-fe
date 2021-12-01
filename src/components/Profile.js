import React from "react";
import GoalList from "./GoalList";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <h2>My Goals</h2>
      <Link to={`/new-goal/${userId}`}>
        <button>Create New Goal</button>
      </Link>
      <GoalList />
    </div>
  );
};

export default Profile;
