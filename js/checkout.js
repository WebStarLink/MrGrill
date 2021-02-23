//ОТРИСОВКА КАРТОЧЕК ТОВАРА
const renderCart = function () {
  const fullCart = document.querySelector(".cart__item_block");
  const summaryInfo = document.querySelector(".cart__block__amount");
  fullCart.innerHTML = ``;
  for (let i in cart) {
    if (cart[i]["count"] > 0) {
      try {
        let itemTotal = cart[i]["price"];
        let converted = parseFloat(itemTotal);
        let totalAmount = converted * cart[i]["count"];
        fullCart.innerHTML += `
        <div class="cart__item">
        <div class="cart__item_img"><img src="${cart[i]["img"]}" alt="${cart[i]["name"]}"></div>
        <div class="cart__item_title"><h3>${cart[i]["name"]}</h3></div>
        <div class="cart__item_summary"><div class="cart__item_total"><p>${totalAmount} BYN</p></div>
        <div class="cart__item_qty"><button class="minus-btn" data-id="${i}">-</button><span>${cart[i]["count"]}</span><button class="plus-btn" data-id="${i}">+</button></div>
        <button class="del" data-id="${i}">X</button>
        </div>`;
      } catch {
        return false;
      }
    }
  }
  // ОТРИСОВКА ИТОГА В КОНЦЕ
  let allcount = 0;
  for (let i in cart) {
    allcount += cart[i]["count"] * parseFloat(cart[i]["price"]);
    summaryInfo.innerHTML = `${allcount} BYN`;
  }
};

window.onload = renderCart();

// УДАЛЕНИЕ ТОВАРА

const removeItem = (id) => {
  cart[id]["count"] = 0;
  localStorage.setItem("cart", JSON.stringify(cart));
  calcQty();
  renderCart();
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("del")) {
    singleItem = event.target.closest(".cart__item");
    singleItem.style.opacity = "0";
    singleItem.addEventListener("transitionend", () => {
      removeItem(event.target.dataset.id);
    });
  }
});

// НАЖАТИЕ НА КНОПКИ - И +

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("minus-btn")) {
    singleItemMinus(event.target.dataset.id);
  }
  if (event.target.classList.contains("plus-btn")) {
    singleItemPlus(event.target.dataset.id);
  }
});

// УВЕЛИЧЕНИЕ ТОВАРА
const singleItemPlus = (id) => {
  cart[id]["count"]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  calcQty();
  renderCart();
};

// УМЕНЬШЕНИЕ ТОВАРА
const singleItemMinus = (id) => {
  cart[id]["count"]--;
  localStorage.setItem("cart", JSON.stringify(cart));
  // if (cart[id]["count"] == 0) {
  //   document.addEventListener("", (event) => {
  //     if (event.target.classList.contains("minus-btn")) {
  //       singleItem = event.target.closest(".cart__item");
  //       console.log(singleItem);
  //       singleItem.style.opacity = "0";
  //       singleItem.addEventListener("transitionend", () => {
  //         removeItem(event.target.dataset.id);
  //         console.log("Opacity");
  //         console.log("Достигло нуля");
  //       });
  //     }
  //   });
  // } else {
  // }
  calcQty();
  renderCart();
};

//МАСКА ТЕЛЕФОНА

const orderInputs = document.querySelector(".checkout__order");
orderInputs.addEventListener("click", (event) => {
  const orderPhone = document.querySelector(".checkout__phone");
  if (event.target.classList.contains("checkout__phone")) {
    orderPhone.value = "+375";
  } else {
    orderPhone.value = "";
  }
});
