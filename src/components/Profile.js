import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/goalsActions";
import PropTypes from "prop-types";
import GoalList from "./GoalList";

const Profile = (props) => {
  const [title, setTitle] = useState("All Goals");

  const params = useParams();
  const userId = params.userId;
  const savedBackground = localStorage.getItem("goals background");
  const totalGoals = props.goals.length;
  let completedGoals = 0;
  let uncompletedGoals = 0;
  const unfinished = document.getElementsByClassName("unfinished-goals");
  const completed = document.getElementsByClassName("completed-goals");

  useEffect(() => {
    props.fetchUserGoals(userId);
  }, []);

  props.goals.map((goal) => {
    if (goal.goal_completed) {
      completedGoals += 1;
    }
    if (!goal.goal_completed) {
      uncompletedGoals += 1;
    }
  });

  const showGoals = (viewGoals) => {
    for (let i = 0; i < viewGoals.length; i++) {
      viewGoals[i].style.display = "block";
    }
  };

  const hideGoals = (viewGoals) => {
    for (let i = 0; i < viewGoals.length; i++) {
      viewGoals[i].style.display = "none";
    }
  };

  const handleShowAllGoals = () => {
    showGoals(completed);
    showGoals(unfinished);
    setTitle("All Goals");
  };

  const handleShowCompleted = () => {
    showGoals(completed);
    hideGoals(unfinished);
    setTitle("Completed Goals");
  };

  const handleShowUnfinished = () => {
    showGoals(unfinished);
    hideGoals(completed);
    setTitle("Goals in Progress");
  };

  const handleSelectOption = (e) => {
    const { value } = e.target;
    value === "all" && handleShowAllGoals();
    value === "progress" && handleShowUnfinished();
    value === "completed" && handleShowCompleted();
  };

  return (
    <div
      className="profile-content"
      style={{
        backgroundImage: `url(${savedBackground || props.backgroundImage})`,
      }}
    >
      <div className="dashboard">
        <h2>{title}</h2>
        <select
          className="dashboard-options-mobile"
          onChange={handleSelectOption}
        >
          <option value="all">All Goals: {totalGoals}</option>
          <option value="progress">In Progress: {uncompletedGoals}</option>
          <option value="completed">Completed: {completedGoals}</option>
        </select>
        <div className="dashboard-options-container">
          <div className="dashboard-view-options" onClick={handleShowAllGoals}>
            <h3>All goals:</h3>
            <h3>{totalGoals}</h3>
          </div>
          <div
            className="dashboard-view-options"
            onClick={handleShowUnfinished}
          >
            <h3>In Progress:</h3>
            <h3>{uncompletedGoals}</h3>
          </div>
          <div className="dashboard-view-options" onClick={handleShowCompleted}>
            <h3>Completed:</h3>
            <h3>{completedGoals}</h3>
          </div>
        </div>
      </div>
      <GoalList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    goals: state.goalsReducer.goals,
    isFetching: state.goalsReducer.isFetching,
    error: state.goalsReducer.error,
    backgroundImage: state.userReducer.backgroundImage,
  };
};

Profile.propTypes = {
  goals: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchUserGoals: PropTypes.func,
  backgroundImage: PropTypes.any,
};

export default connect(mapStateToProps, { fetchUserGoals })(Profile);
