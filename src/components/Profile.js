import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/goalsActions";
import PropTypes from "prop-types";
import GoalList from "./GoalList";

const Profile = (props) => {
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    props.fetchUserGoals(userId);
  }, [userId]);

  const totalGoals = props.goals.length;
  let completedGoals = 0;
  let uncompletedGoals = 0;
  props.goals.map((goal) => {
    if (goal.goal_completed) {
      completedGoals += 1;
    }
    if (!goal.goal_completed) {
      uncompletedGoals += 1;
    }
  });

  return (
    <div className="profile-content">
      <h2>My Goals</h2>
      <div className="dashboard-stats">
        <h3>Total goals: {totalGoals}</h3>
        <h3>Goals Completed: {completedGoals}</h3>
        <h3>Goals in Progress: {uncompletedGoals}</h3>
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
  };
};

Profile.propTypes = {
  goals: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchUserGoals: PropTypes.func,
};

export default connect(mapStateToProps, { fetchUserGoals })(Profile);
