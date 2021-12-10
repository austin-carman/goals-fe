import React from "react";
import { useHistory } from "react-router-dom";
import tempImage from "../images/path.png";

const Home = () => {
  const { push } = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    push("/login");
  };

  return (
    <div>
      <section className="hero">
        <h1>Where will goals take you?</h1>
        <button onClick={handleClick}>Start now</button>
      </section>
      <section className="top-info-section">
        <div>
          <h2>&quot;A goal properly set is halfway reached.&quot;</h2>
          <h4>— Zig Ziglar</h4>
        </div>
        {/* <p>
          We&apos;ve all made a goal that we end up forgetting about. With
          GoalTracker all your goals are grouped together in one convenient
          location so you can easily review them.
        </p> */}
      </section>
      <section className="thirds-section">
        <div className="third-container">
          <img src={tempImage} />
          <div>
            <h3 className="thirds-title">Organize</h3>
            <p>
              We&apos;ve all made a goal that we end up forgetting about or
              write it down only to lose it or throw it out by accident.
              GoalTracker makes it easy to quickly record your goals and group
              them together in one convenient location so you can easily review
              them.
            </p>
          </div>
        </div>
        <div className="third-container">
          <img src={tempImage} />
          <div>
            <h3 className="thirds-title">Plan</h3>
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
          <img src={tempImage} />
          <div>
            <h3 className="thirds-title">Become</h3>
            <p>
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
