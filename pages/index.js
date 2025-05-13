import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm("#add-todo-popup", handleFormSubmit);
addTodoPopup.setEventListeners();
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = dateInput ? new Date(dateInput) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  addTodoPopup.close();
  newTodoValidator.resetValidation();
}

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (todoItem) => {
    return generateTodo(todoItem);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
