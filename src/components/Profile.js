import React from "react";
import GoalList from "./GoalList";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <Link to={`/new-goal/${userId}`}>
        <button>Create New Goal</button>
      </Link>
      <GoalList />
    </div>
  );
};

export default Profile;
