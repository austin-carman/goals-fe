import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    push("/login");
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="quote">
            &quot;A goal properly set is halfway reached.&quot;
          </h1>
          <h3>— Zig Ziglar</h3>
          <button className="hero-button" onClick={handleClick}>
            Create Goal
          </button>
        </div>
      </section>
      <section className="middle-section">
        <div>
          <h2 className="quote">Goal Tracker helps you achieve your goals</h2>
        </div>
      </section>
      <section className="thirds-section">
        <div className="third-container">
          <div className="home-image-container1"></div>
          <div>
            <h3 className="thirds-title">Organize Your Life</h3>
            <p>
              We&apos;ve all made a goal, determined to see it through, only to
              let it fade from memory in our busy lives. GoalTracker makes it
              easy to quickly record your goals and group them together in one
              convenient location so you can review them frequently.
            </p>
          </div>
        </div>
        <div className="third-container">
          <div className="home-image-container2"></div>
          <div>
            <h3 className="thirds-title">Make a Plan</h3>
            <p>
              It&apos;s nearly impossible to achieve a goal without a well
              developed plan. GoalTracker helps you in creating a plan by
              allowing you to add steps, or smaller, checkpoint goals, record
              notes for each step, and completion checkboxes. This helps you
              stay on track, record your progress and make achieving your goal
              more manageable.
            </p>
          </div>
        </div>
        <div className="third-container">
          <div className="home-image-container3"></div>
          <div>
            <h3 className="thirds-title">Reach Your Potential</h3>
            <p className="quote">
              &quot;What you get by achieving your goals is not as important as
              what you become by achieving your goals.&quot;
            </p>
            <h4>— Zig Ziglar</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
