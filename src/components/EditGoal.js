import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import DeleteModal from "./DeleteModal";

const EditGoal = () => {
  const location = useLocation();
  const history = useHistory();

  const { userGoal } = location.state;
  const initialState = {
    goal_id: userGoal.goal_id,
    goal_title: userGoal.goal_title,
    goal_completed: userGoal.goal_completed,
    steps: userGoal.steps,
  };
  const [goal, setGoal] = useState(initialState);
  const [errMessage, setErrMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("goal: ", goal);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "goal_title") {
      setGoal({ ...goal, [name]: value });
    }
    if (name === "step_title") {
      let goalEdits = { ...goal };
      let stepEdits = [...goal.steps];
      stepEdits[index][name] = value;
      goalEdits.steps = stepEdits;
      setGoal(goalEdits);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSave = () => {
    const editedGoal = { ...goal };
    editedGoal.steps = [...goal.steps.filter((step) => step.step_title !== "")];
    axiosWithAuth()
      .put(
        `https://goalmanager.herokuapp.com/api/goal/edit/${goal.goal_id}`,
        editedGoal
      )
      .then((res) => {
        if (res.data.goal_id) {
          setErrMessage(null);
          setGoal(res.data);
          history.goBack();
        } else {
          setErrMessage("Please complete all required fields");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <form>
        {errMessage ? <p>{errMessage}</p> : null}
        <label>
          Goal Title
          <input
            type="text"
            name="goal_title"
            value={goal.goal_title}
            onChange={handleChange}
          />
        </label>
        {goal.steps.map((step, index) => {
          return (
            <div key={`${step}-${index}`}>
              <label>
                Step {index + 1}:
                <input
                  type="text"
                  name="step_title"
                  value={step.step_title}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Step Title"
                />
              </label>
            </div>
          );
        })}
      </form>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={openModal}>Delete</button>
      {isModalOpen ? (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setErrMessage={setErrMessage}
        />
      ) : null}
    </div>
  );
};

export default EditGoal;
