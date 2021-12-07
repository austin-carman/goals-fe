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
        <h1>Where will goals take you?</h1>
        <button onClick={handleClick}>Start now</button>
      </section>
      <section className="info-section">
        <div>
          <h2>&quot;A goal properly set is halfway reached.&quot;</h2>
          <h4>— Zig Ziglar</h4>
        </div>
        <p>
          We&apos;ve all made a goal that we end up forgetting about in our busy
          lives. With GoalTracker all your goals are grouped together in one
          convenient location so you can easily view them without having to try
          and remember everything.
        </p>
      </section>
      <section className="info-section">
        <div>
          <h2>
            &quot;Goals are pure fantasy unless you have a specific plan to
            achieve them.&quot;
          </h2>
          <h4> — Stephen Covey</h4>
        </div>
        <p>
          GoalTracker allows you to create a goal with steps, or smaller
          landmark goals, to help you stay organized and make achieving your
          goal more manageable.
        </p>
      </section>
      <section className="info-section">
        <div>
          <h2>
            &quot;What you get by achieving your goals is not as important as
            what you become by achieving your goals.&quot;
          </h2>
          <h4>— Zig Ziglar</h4>
        </div>
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
