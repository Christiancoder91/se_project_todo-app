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
    const newValue = this._completed + (increment ? 1 : -1);
    if (newValue >= 0 && newValue <= this._total) {
      this._completed = newValue;
      this._updateText();
    }
  };

  updateTotal = (increment) => {
    const newValue = this._total + (increment ? 1 : -1);
    if (newValue >= 0) {
      this._total = newValue;
      this._updateText();
    }
  };
  _updateText = () => {
    this._element.textContent = `${this._completed} out of ${this._total} tasks completed`;
  };
}

export default TodoCounter;
