import { SUBMIT } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SUBMIT:
      const tasks = action.payload.entities.tasks;
      console.log("SUBMIT", { tasks });
      return { ...state, tasks };

    default:
      return state;
  }
};

export default reducer;
