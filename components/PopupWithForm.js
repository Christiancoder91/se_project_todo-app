import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
