const menu = document.querySelector(".menu");
const menuControl = menu.querySelector(".menu__control");
const iconClose = menu.querySelector(".menu__close");
const iconOpen = menu.querySelector(".menu__open");
const menuNavigation = menu.querySelector(".menu__navigation");

const mobileMenu = () => {
  const menuToggle = () => {
    iconClose.classList.toggle("active");
    iconOpen.classList.toggle("active");
    menu.classList.toggle("menu--closed");

    menuControl.setAttribute("aria-label", "Закрыть меню");
    if (!menu.classList.contains("menu--closed")) {
      menuControl.setAttribute("aria-label", "Открыть меню");
    }
  };

  menuControl.addEventListener("click", menuToggle);
};

mobileMenu();

const sliderControl = document.querySelector(".slider__control");
if (sliderControl) {
  const slidePrev = sliderControl.querySelector(".slider__button--prev");
  const sliderNext = sliderControl.querySelector(".slider__button--next");
  const pin = sliderControl.querySelector(".range__pin");
}

const URL = "https://echo.htmlacademy.ru";
const forms = document.querySelectorAll(".questionnaire__form");

if (forms) {
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

  const formHandler = (item) => {
    let statusMessage = document.createElement("div");
    statusMessage.classList.add("status");
    item.appendChild(statusMessage);

    const formData = new FormData(item);

    postData(URL, formData)
      .then((res) => {
        console.log(res);
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

  forms.forEach((item) => {
    item.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formHandler(item);
    });
  });
}
