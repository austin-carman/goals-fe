import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GoalCard from "./GoalCard";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/goalsActions";
import PropTypes from "prop-types";
import { sortGoals } from "../utils/helperFunctions";
import addStep from "../images/plus-circle.png";

const GoalList = (props) => {
  const params = useParams();
  const userId = params.userId;

  // only run this if goals do not exist in state already
  useEffect(() => {
    props.fetchUserGoals(userId);
  }, [userId]);

  const sortedGoals = sortGoals(props.goals);

  return (
    <div className="goals-lists-container">
      {!props.isFetching && (
        <Link
          to={`/new-goal/${userId}`}
          className="goal-card-container new-goal-card"
        >
          <img src={addStep} className="icon" />
          <p>New Goal</p>
        </Link>
      )}
      {props.isFetching ? (
        <h2>Loading...</h2>
      ) : (
        sortedGoals.map((goal, index) => {
          return <GoalCard key={goal.goal_id} goal={goal} index={index} />;
        })
      )}
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

GoalList.propTypes = {
  goals: PropTypes.array,
  isFetching: PropTypes.bool,
  fetchUserGoals: PropTypes.func,
};

export default connect(mapStateToProps, { fetchUserGoals })(GoalList);
