import React from "react";
import GoalList from "./GoalList";
import { useHistory, useParams } from "react-router-dom";

const Profile = () => {
  const { push } = useHistory();
  const params = useParams();

  const handleClick = (e) => {
    e.preventDefault();
    push(`/new-goal/${params.userId}`);
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Info about user/profile</p>
      <button onClick={handleClick}>New Goal</button>
      <GoalList />
    </div>
  );
};

export default Profile;
