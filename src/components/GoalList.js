import React, { useEffect } from "react";
import { useParams } from "react-router";
import GoalCard from "./GoalCard";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/actions";
import PropTypes from "prop-types";
import { sortGoals } from "../utils/helperFunctions";

const GoalList = (props) => {
  const params = useParams();
  const user = params.userId;

  useEffect(() => {
    props.fetchUserGoals(user);
  }, [user]);

  const sortedGoals = sortGoals(props.goals);

  return (
    <div>
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
