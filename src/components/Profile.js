import React from "react";
import GoalList from "./GoalList";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Info about user/profile</p>
      <Link to={`/new-goal/${userId}`}>
        <button>New Goal</button>
      </Link>
      <GoalList />
    </div>
  );
};

export default Profile;
