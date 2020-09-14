import { assocPath, filter, intersection, keys, map, prop } from "ramda";

export const views = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_INITIATIVE: "SHOW_INITIATIVE",
  SHOW_USER: "SHOW_USER"
};

// : keys(props.tasks) // benefiting from normalized form of tasks
const newId = state => `T${keys(state.tasks).length}`;
const createTask = state => ({
  id: newId(state),
  description: "New task",
  initiatives: [],
  users: []
});

const mergeNewTask = state => {
  const newTask = createTask(state);
  return {
    ...state,
    tasks: assocPath([newTask.id], newTask, state.tasks)
  };
};

const updateTask = (state, action) => {
  return assocPath([action.id, "description"], action.description, state.tasks);
};

/*
REDUCER
*/

export const initialize = props => ({
  tasks: props.tasks,
  view: views.SHOW_ALL,
  filter: null
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return mergeNewTask(state);

    case "CHANGE_TASK":
      return {
        ...state,
        tasks: updateTask(state, action)
      };

    case "FILTER":
      return {
        ...state,
        view: action.view,
        filter: action.filter
      };

    default:
      return state;
  }
};

export default reducer;

const createFilterAction = view => e => {
  const { value } = e.target;
  const action = {
    type: "FILTER",
    filter: value
  };
  return value.length > 0
    ? {
        ...action,
        view: view
      }
    : {
        ...action,
        view: views.SHOW_ALL
      };
};

export const localActions = {
  addTask: () => ({
    type: "ADD_TASK"
  }),
  changeTask: event => ({
    type: "CHANGE_TASK",
    id: event.target.name,
    description: event.target.value
  }),
  filterByInitiative: createFilterAction(views.SHOW_INITIATIVE),
  filterByUser: createFilterAction(views.SHOW_USER)
};

export const visibleTasks = state => {
  if (state.view === views.SHOW_ALL) {
    return state.tasks;
  }

  if (state.view === views.SHOW_COMPLETED) {
    return filter(task => task.completed, state.tasks);
  }

  if (state.view === views.SHOW_INITIATIVE) {
    const initiativeDescriptions = state.filter;
    const hasInitiatives = task => {
      return (
        intersection(
          initiativeDescriptions,
          task.initiatives.map(prop("description"))
        ).length > 0
      );
    };
    return filter(hasInitiatives, state.tasks);
  }

  if (state.view === views.SHOW_USER) {
    const userNames = state.filter;
    const hasUsers = task => {
      return intersection(userNames, task.users.map(prop("name"))).length > 0;
    };
    console.log(state.tasks);
    console.log(map(hasUsers, state.tasks));
    return filter(hasUsers, state.tasks);
  }
};
