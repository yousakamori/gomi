// https://medium.com/@therealmaarten/using-normalizr-great-dont-use-denormalize-though-a80857710b54
import { normalize, schema } from "normalizr";

// when definining schemas the key (first arg to schema.Entity) has to correspond to key in state
const initiative = new schema.Entity("initiatives");
const user = new schema.Entity("users");
const task = new schema.Entity("tasks", {
  initiatives: [initiative],
  users: [user]
});

export const normalizeTasks = tasks => normalize(tasks, [task]);
