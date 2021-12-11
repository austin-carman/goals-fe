import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/goalsActions";
import PropTypes from "prop-types";
import GoalList from "./GoalList";

const Profile = (props) => {
  const params = useParams();
  const userId = params.userId;
  const savedBackground = localStorage.getItem("goals background");

  useEffect(() => {
    props.fetchUserGoals(userId);
  }, []);

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
    <div
      className="profile-content"
      style={{
        backgroundImage: `url(${savedBackground || props.backgroundImage})`,
      }}
    >
      <div className="dashboard">
        <h2>My Goals</h2>
        <div className="dashboard-stats">
          <div>
            <h3>Total goals:</h3>
            <h3>{totalGoals}</h3>
          </div>
          <div>
            <h3>Goals Completed:</h3>
            <h3>{completedGoals}</h3>
          </div>
          <div>
            <h3>Goals in Progress:</h3>
            <h3>{uncompletedGoals}</h3>
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
