import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    push("/register");
  };

  return (
    <section className="callToAction">
      <h1>Goal Tracker</h1>
      <button onClick={handleClick}>Start New Goal</button>
    </section>
  );
};

export default Home;
