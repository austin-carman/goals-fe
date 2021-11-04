import React, { useEffect } from "react";
import GoalCard from "./GoalCard";
import { connect } from "react-redux";
import { fetchUserGoals } from "../actions/actions";
import PropTypes from "prop-types";

const GoalList = (props) => {
  useEffect(() => {
    props.fetchUserGoals();
  }, []);

  return (
    <div>
      <h2>Testing</h2>
      {props.isFetching ? (
        <h2>Loading...</h2>
      ) : (
        props.goals.map((goal) => {
          return <GoalCard key={goal.goal_id} goal={goal} />;
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    goals: state.goalsReducer.goals,
    isFetching: state.isFetching,
  };
};

GoalList.propTypes = {
  goals: PropTypes.array,
  isFetching: PropTypes.boolean,
  fetchUserGoals: PropTypes.any,
};

export default connect(mapStateToProps, { fetchUserGoals })(GoalList);
