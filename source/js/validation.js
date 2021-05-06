"use strict";

const lackValueInput = (item) => {
  if (item.validity.tooShort) {
    item.setCustomValidity("Нужно заполнить поле");
    item.classList.add("input--error");
  } else {
    item.classList.remove("input--error");
    item.setCustomValidity('');
  }
}

const validation = (item) => {
  const inputs = item.querySelectorAll(".input");
  console.log(inputs);

  inputs.forEach((item) => {
    item.addEventListener("invalid", () => {
      lackValueInput(item)
    })
  })
}

export default validation;
