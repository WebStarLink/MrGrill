// https://api.telegram.org/bot1195246232:AAHTjNkeLWQw4wCFW9DbFcXWZ9PsyL8x0Jc/getUpdates
// https://api.telegram.org/bot1195246232:AAHTjNkeLWQw4wCFW9DbFcXWZ9PsyL8x0Jc/sendMessage?chat_id=-487741813

const token = "1195246232:AAHTjNkeLWQw4wCFW9DbFcXWZ9PsyL8x0Jc";
const chatId = "-487741813";
let url =
  "https://api.telegram.org/bot" +
  token +
  "/sendMessage?chat_id=" +
  chatId +
  "&text=";
const sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (event) => {
  event.preventDefault;
  renderMessage();
  clearCart();
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
      //   summaryInfo.innerHTML = `${allcount} BYN`;
      let result = `${text} x [${count}]`;
      sumOfCart += `${result}%0A`;
      message = `=============================%0A🍖=== Новый заказ в ${date.getHours()}:${
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      } ===🍖%0A=============================%0A<b>Имя:</b> ${name}%0A<b>Адрес:</b> ${address}%0A<b>Телефон:</b> ${phone}%0A<b>Оплата:</b> ${payment}%0A==========ЗАКАЗ:=============%0A${sumOfCart}%0A==========СУММА:=============%0AСумма заказа: ${telegramTotal} BYN&parse_mode=html`;
    }
  }
  console.log(message);
  console.log(telegramTotal);
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", url + message, true);
  xhttp.send();
}

function clearCart() {
  for (i in cart) {
    cart[i]["count"] = 0;
  }
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  calcQty();
  renderCart();
}
