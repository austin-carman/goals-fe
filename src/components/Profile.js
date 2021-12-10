import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/goalsActions";
import PropTypes from "prop-types";
import GoalList from "./GoalList";
import oceanSunset from "../images/ocean-sunset.jpg";
import oceanMountains from "../images/ocean-mountains.jpg";
import guitar from "../images/guitar.jpg";
import library from "../images/library.jpg";
import plants from "../images/plants.jpg";
import wood from "../images/wood.jpg";

const Profile = (props) => {
  const [selectedBackground, setSelectedBackground] = useState(null);
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

  const handleBackground = (e) => {
    const { value } = e.target;
    console.log("background: ", selectedBackground);
    setSelectedBackground(value);
  };

  return (
    <div
      className="profile-content"
      style={{ backgroundImage: `url(${selectedBackground})` }}
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
          <div>
            <h3>Background:</h3>
            <select
              placeholder="Select a Background"
              value={selectedBackground}
              onChange={handleBackground}
            >
              <option value={null}>None</option>
              <option value={oceanSunset}>Shoreline Sunset</option>
              <option value={oceanMountains}>
                Tropical Mountains and Ocean
              </option>
              <option value={guitar}>Guitar</option>
              <option value={library}>Library</option>
              <option value={plants}>Plants</option>
              <option value={wood}>Wood</option>
            </select>
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
  };
};

Profile.propTypes = {
  goals: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchUserGoals: PropTypes.func,
};

export default connect(mapStateToProps, { fetchUserGoals })(Profile);
