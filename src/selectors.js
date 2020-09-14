import { createSelector } from "reselect";
import { map } from "ramda";

export const selectInitiatives = state => state.entities.initiatives;
export const selectUsers = state => state.entities.users;

export const selectTasks = createSelector(
  [state => state.entities.tasks, selectInitiatives, selectUsers],
  (tasks, initiatives, users) => {
    return map(
      task => ({
        ...task,
        initiatives: task.initiatives.map(id => initiatives[id]),
        users: task.users.map(id => users[id])
      }),
      tasks
    );
  }
);
