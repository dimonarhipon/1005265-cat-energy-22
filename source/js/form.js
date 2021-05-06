"use strict";

const URL = "https://echo.htmlacademy.ru";
const forms = document.querySelectorAll(".questionnaire__form");
const message = {
  loading: "Загрузка...",
  success: "Спасибо! Заявка принята",
  failure: "Что-то пошло не так...",
};

const postData = async (url, data) => {
  document.querySelector(".status").textContent = message.loading;
  let res = await fetch(url, {
    method: "POST",
    body: data,
  });
  return await res.text();
};

const sendForm = (item) => {
  let statusMessage = document.createElement("div");
  statusMessage.classList.add("status");
  item.appendChild(statusMessage);

  const formData = new FormData(item);

  postData(URL, formData)
    .then(() => {
      statusMessage.textContent = message.success;
    })
    .catch(() => (statusMessage.textContent = message.failure))
    .finally(() => {
      item.reset();
      setTimeout(() => {
        statusMessage.remove();
      }, 5000);
    });
};

const formHandler = (item) => {
  sendForm(item);
}

const lackValueInput = (element) => {
  if (element.validity.valueMissing) {
    element.setCustomValidity("Нужно заполнить поле");
    element.classList.add("questionnaire__input--error");
  } else {
    element.classList.remove("questionnaire__input--error");
    element.setCustomValidity('');
  }
}

const validation = (item) => {
  const inputs = item.querySelectorAll(".input");
  inputs.forEach((element) => {
    element.addEventListener("invalid", () => {
      lackValueInput(element);
    })
  })
}

const form = () => {
  forms.forEach((item) => {
    validation(item);
    item.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formHandler(item);
    });
  });
}

form();
