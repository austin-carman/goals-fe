import React from "react";
import GoalList from "./GoalList";

const Profile = () => {
  return (
    <div>
      <h2>Profile Page</h2>
      <p>Info about user/profile</p>
      <button>New Goal</button>
      <GoalList />
    </div>
  );
};

export default Profile;
