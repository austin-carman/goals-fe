import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    push("/register");
  };

  return (
    <div>
      <section className="hero">
        <h1>Goal Tracker</h1>
        <button onClick={handleClick}>Track Your Goals</button>
      </section>
      <section className="top-info">
        <h2>Remember your goals</h2>
        <p>
          Haven&apos; t we all made a goal only to forget about it later?With
          GoalTracker all your goals are grouped together and easily accessible
          so you won&apos; t be stuck trying to remember them down the road.
        </p>
      </section>
      <section className="middle-info">
        <h2>Break your goal down</h2>
        <p>
          GoalTracker allows you to create a goal with steps, or smaller
          landmark goals, to help you stay organized and make achieving your
          goal more manageable.
        </p>
      </section>
      <section className="bottom-info">
        <h2>Record your progress</h2>
        <p>
          With each step you can record notes to record your progress or leave
          reminders for your future self. Once you achieve a step, mark it as
          completed to stay organized and allow you to see how far you&apos;ve
          come in completing your goal.
        </p>
      </section>
    </div>
  );
};

export default Home;
