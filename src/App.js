import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { keys, map, prop, values } from "ramda";
//
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";
//
import actions from "./actions";
import taskReducer, {
  visibleTasks,
  localActions,
  initialize
} from "./localReducer";
import Select from "./components";
import { selectTasks, selectInitiatives, selectUsers } from "./selectors";
import { normalizeTasks } from "./normalize";

const App = props => {
  // TASKS
  const [state, dispatch] = React.useReducer(taskReducer, initialize(props));
  const actions = bindActionCreators(localActions, dispatch);

  const { initiatives, users, submit } = props;
  const tasks = values(visibleTasks(state));
  const descriptions = values(initiatives).map(prop("description"));
  const userNames = values(users).map(prop("name"));

  return (
    <div className="App">
      <h2>Normalizr Experiment</h2>
      <div style={{ display: "flex" }}>
        <Button variant="outlined" color="primary" onClick={actions.addTask}>
          Add
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => submit(state.tasks)}
          style={{ marginLeft: 8 }}
        >
          Submit
        </Button>
        <Select
          placeholder="Filter Initiative"
          options={descriptions}
          value={state.view === "SHOW_INITIATIVE" ? state.filter : []}
          onChange={actions.filterByInitiative}
        />
        <Select
          placeholder="Filter User"
          options={userNames}
          value={state.view === "SHOW_USER" ? state.filter : []}
          onChange={actions.filterByUser}
        />
      </div>
      <List>
        {tasks.map(task => {
          return (
            <ListItem
              key={task.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto"
              }}
            >
              <div>
                <div>
                  <b>Description</b> : {task.description}
                </div>
                <div>
                  <b>initiatives</b> :{" "}
                  {task.initiatives.map(prop("description"))}
                </div>
                <div>
                  <b>users</b> : {task.users.map(prop("name")).join(", ")}
                </div>
              </div>
              <div
                style={{
                  background: "whitesmoke",
                  padding: 8,
                  border: "1px solid lightgrey"
                }}
              >
                <InputBase
                  placeholder="change description"
                  onChange={actions.changeTask}
                  name={task.id}
                  value={task.description}
                />
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tasks: selectTasks(state),
    initiatives: selectInitiatives(state),
    users: selectUsers(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submit: tasks => dispatch(actions.submit(normalizeTasks(tasks)))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
