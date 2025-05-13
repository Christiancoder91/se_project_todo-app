class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._name = data.name;
    this._date = data.date || null;
    this._completed = data.completed || false;
    this._id = data.id;
    this._templateSelector = templateSelector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheck(this._data.completed);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._view.remove();
      this._handleDelete(this._completed);
    });
  }

  setupCheckboxEl() {
    this._todoCheckboxEl = this._view.querySelector(".todo__completed");
    this._todoLabel = this._view.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._templateElement = document.querySelector(this._templateSelector);
    this._view = this._templateElement.content
      .cloneNode(true)
      .querySelector(".todo");

    const todoNameEl = this._view.querySelector(".todo__name");
    const todoDate = this._view.querySelector(".todo__date");
    this._todoDeleteBtn = this._view.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        todoDate.textContent = "Invalid date format";
      }
    }

    this.setupCheckboxEl();
    this._setEventListeners();

    return this._view;
  }
}

export default Todo;
