import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    push("/register");
  };

  return (
    <main>
      <section className="callToAction">
        <h1>Goal Tracker</h1>
        <button onClick={handleClick}>Track Your Goals</button>
      </section>
      <section className="info-section">
        <div className="section1">
          <img src="#" />
          <h2>Section heading</h2>
          <p>Info about section</p>
        </div>
        <div className="section2">
          <img src="#" />
          <h2>Section heading</h2>
          <p>Info about section</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
