class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };
  _updateText = () => {
    this._element.textContent = `${this._completed} out of ${this._total} tasks completed`;
  };
}

export default TodoCounter;
