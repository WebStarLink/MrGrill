// -------------------------- HEADER -----------------------

// ------------------- ПЕРЕМЕННЫЕ КНОПОК -------------------
const callBtn = document.querySelector(".call");
const mapBtn = document.querySelector(".map");

// ------------------- НАЖАТИЕ НА КНОПКИ -------------------
callBtn.addEventListener("click", () => {
  const add = document.querySelector(".head__info_call");

  if (document.querySelector(".head__info_call.opened")) {
    add.classList.remove("opened");
  } else {
    document.querySelector(".head__info_map").classList.remove("opened");
    add.classList.add("opened");
  }
});
mapBtn.addEventListener("click", () => {
  const add = document.querySelector(".head__info_map");

  if (document.querySelector(".head__info_map.opened")) {
    add.classList.remove("opened");
  } else {
    document.querySelector(".head__info_call").classList.remove("opened");
    add.classList.add("opened");
  }
});

// ---------------- ПРИМЕНЕНИЕ STICKY HEADER ----------------

this.onscroll = function () {
  const header = document.querySelector(".head__menu");
  const mobile = window.matchMedia("(max-width: 991px)");
  const desctop = window.matchMedia("(min-width: 992px)");
  if (mobile.matches === true && this.pageYOffset >= 40) {
    header.classList.add("sticky");
    document.querySelector(".head").style.paddingBottom = "4.8rem";
  } else if (desctop.matches === true && this.pageYOffset >= 115) {
    header.classList.add("sticky");
    document.querySelector(".head").style.paddingBottom = "8rem";
  } else {
    header.classList.remove("sticky");
    document.querySelector(".head").removeAttribute("style");
  }
};

// ПРИМЕНЕНИЕ active СВОЙСТВА И СКРОЛЛИНГ ПРИ НАЖАНИИ НА МЕНЮ

// ADD .ACTIVE
const menu = document.querySelector(".head__menu__items");
function scrollActive() {
  document
    .querySelector(".active")
    .scrollIntoView({ behavior: "smooth", inline: "center" });
}

// ACTIVE ELEMENT TO CENTER
menu.addEventListener("click", (event) => {
  document.querySelector(".active").classList.remove("active");
  const button = event.target.closest(".head__menu__btn");
  button.classList.add("active");
  let scrollToAnchor;
  window.addEventListener("scroll", function () {
    window.clearTimeout(scrollToAnchor);
    if (this.pageYOffset >= 50) {
      scrollToAnchor = setTimeout(function () {
        scrollActive();
      }, 70);
    }
  });
});

//      -------------------             МАГАЗИН               -------------------------------

// ПЕРЕМЕННЫЕ МАГАЗИНА
let cart = {};
let miniCart = document.querySelector(".cart__count");

// Калькулятор количества товаров
const calcQty = function () {
  let sumOfCart = 0;
  for (i in cart) {
    let result = cart[i]["count"];
    sumOfCart += result;
  }
  miniCart.innerHTML = sumOfCart;
};

// LOCAL STORAGE ПРОВЕРКА И ДЕЙСТВИЕ
const getStorage = localStorage.getItem("cart");
const parseStorage = JSON.parse(getStorage);

if (parseStorage === null) {
  cartData();
} else {
  cart = parseStorage;
  fillPrice();
}

// ЗАГРУЗКА ЦЕН ИЗ CART["PRICE"]
async function fillPrice() {
  try {
    let priceButton = [...document.querySelectorAll(".add-to-cart")];
    priceButton.forEach((el, index) => {
      const id = el.dataset.id;
      priceButton[index].innerHTML = cart[id]["price"];
    });
    calcQty();
  } catch (error) {
    console.log("Словили ошибку - очистили LS");
    localStorage.clear();
    cartData();
  }
}

// СОЗДАНИЕ CART ПРИ ПУСТОМ LOCAL STORAGE

async function getJson() {
  const response = await fetch("./json/listing.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.forEach((el) => {
        cart[el.id] = {
          name: el.name,
          count: el.count,
          img: el.img,
          price: el.price,
        };
      });
    });

  calcQty();
}
async function cartData() {
  await getJson();
  await fillPrice();
}

// КОПКИ ДОБАВЛЕНИЯ И УДАЛЕНИЯ ТОВАРОВ
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    addToCart(event.target.dataset.id);
  }
  if (event.target.classList.contains("del-from-cart")) {
    removeFromCart(event.target.dataset.id);
  }
});

// Добавление товара в корзину
const addToCart = (id) => {
  cart[id]["count"]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  calcQty();
};

// ОПОВЕЩЕНИЯ

const date = new Date();
if (date.getDay() >= 5 && (date.getHours() >= 21 || date.getHours() < 9)) {
  const alertBlock = document.querySelector(".workinday__alert");
  const alertMsg = document.querySelector(".workindday__alert_message");
  alertBlock.classList.add("open");
  alertMsg.innerHTML = `<p>
  Сегодня мы работаем<br />
  <strong>до 01:00</strong><br />
  И готовы принять ваш заказ ;)
</p>`;
  alertBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("alert__btn")) {
      alertBlock.classList.remove("open");
    }
  });
}
if (date.getDay() < 5 && (date.getHours() >= 21 || date.getHours() < 9)) {
  const alertBlock = document.querySelector(".workinday__alert");
  const alertMsg = document.querySelector(".workindday__alert_message");
  alertBlock.classList.add("open");
  alertMsg.innerHTML = `<p>
  В будние дни мы работаем<br />
  <strong>с 08:00 до 21:00</strong><br />
  К сожалению, мы уже не работаем.
</p>`;
  alertBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("alert__btn")) {
      alertBlock.classList.remove("open");
    }
  });
}
