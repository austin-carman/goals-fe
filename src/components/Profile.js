import React from "react";
import GoalList from "./GoalList";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

const Profile = () => {
  const { push } = useHistory();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    push(`/new-goal/${location.state.userId}`);
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
