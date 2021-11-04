const initialState = [
  {
    goal_id: null,
    user_id: null,
    goal_title: "",
    goal_completed: null,
    steps: [
      {
        step_id: null,
        goal_id: null,
        step_title: "",
        step_notes: "",
        step_completed: null,
      },
    ],
  },
];
const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default goalReducer;
