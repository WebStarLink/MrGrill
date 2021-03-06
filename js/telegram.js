const token = "Your bot token";
const chatId = "Your chat ID";
let url =
  "https://api.telegram.org/bot" +
  token +
  "/sendMessage?chat_id=" +
  chatId +
  "&text=";
const sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (event) => {
  event.preventDefault;
  fieldValidation();
});

function renderMessage() {
  const name = document.querySelector(".input__name").value;
  const address = document.querySelector(".input__address").value;
  let phone = document
    .querySelector(".checkout__phone")
    .value.replace("+", "%2B");
  const cash = document.querySelector(".input__cash").value;
  let payment = "";
  if (document.querySelector(".input__card:checked")) {
    payment = `💳 Картой`;
  } else {
    payment = `💵 Наличные. Со сдачей [${cash}]`;
  }
  let sumOfCart = "";
  let message = "";
  let telegramTotal = 0;
  for (i in cart) {
    let text = cart[i]["name"];
    let count = cart[i]["count"];
    let total = cart[i]["price"];
    if (cart[i]["count"] > 0) {
      telegramTotal += cart[i]["count"] * parseFloat(total);
      let result = `${text} x [${count}]`;
      sumOfCart += `${result}%0A`;
      message = `=============================%0A🍖=== Новый заказ в ${date.getHours()}:${
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      } ===🍖%0A=============================%0A<b>Имя:</b> ${name}%0A<b>Адрес:</b> ${address}%0A<b>Телефон:</b> ${phone}%0A<b>Оплата:</b> ${payment}%0A==========ЗАКАЗ=============%0A${sumOfCart}%0A==========СУММА=============%0AСумма заказа: ${telegramTotal} BYN&parse_mode=html`;
    }
  }

  fetch(url + message).then((success) => {
    if (success.ok === false) {
      fetchError();
    } else {
      fetchSuccess();
      console.log("Success");
    }
  });
}

function clearCart() {
  for (i in cart) {
    cart[i]["count"] = 0;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  calcQty();
  renderCart();
}

function fetchError() {
  const alertBlock = document.querySelector(".checkout__alert");
  const alertMsg = document.querySelector(".checkout__alert_message");
  alertBlock.classList.add("open");
  alertMsg.innerHTML = `<p>
  Ваша корзина пуста<br>
  Вам нужно что-нибудь добавить :)
  </p>`;
  alertBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("alert__btn")) {
      alertBlock.classList.remove("open");
    }
  });
}
function fetchSuccess() {
  const alertBlock = document.querySelector(".checkout__alert");
  const alertMsg = document.querySelector(".checkout__alert_message");
  alertBlock.classList.add("open");
  alertMsg.innerHTML = `<p>
  Мы только что приняли ваш заказ!<br>
  Мы свяжемся с вами в ближайшее время.
  </p>`;
  alertBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("alert__btn")) {
      alertBlock.classList.remove("open");
    }
  });
}

function fieldValidation() {
  const name = document.querySelector(".input__name");
  const address = document.querySelector(".input__address");
  const phone = document.querySelector(".checkout__phone");

  if (name.value == "" || name.value.includes("#") === true) {
    name.classList.add("emptyfield");
  } else if (address.value == "" || address.value.includes("#") === true) {
    address.classList.add("emptyfield");
  } else if (phone.value == "") {
    phone.classList.add("emptyfield");
  } else {
    renderMessage();
    clearCart();
  }
}
