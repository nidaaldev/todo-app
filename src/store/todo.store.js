import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("Init Store 🥑");
};

const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

  state.todos = todos;
  state.filter = filter;

};

const saveStateToLocalStorage = () => {
  console.log();
  localStorage.setItem('state', JSON.stringify(state));
};

/**
 * 
 * @param {String} filter 
 */

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

/**
 *
 * @param {String} description
 */

const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();

};

/**
 *
 * @param {String} todoId Todo identifier
 */

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    
    saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId Todo identifier
 */

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStateToLocalStorage();
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    console.log(state.todos);

    saveStateToLocalStorage();
};

/**
 * 
 * @param {Filters} newFilter 
 */

const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;

  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
