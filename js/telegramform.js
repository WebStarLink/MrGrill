(function ($) {
  $(".contact__form__form").submit(function (event) {
    event.preventDefault();

    // Сохраняем в переменную form id текущей формы, на которой сработало событие submit
    let form = $("#" + $(this).attr("id"))[0];

    // Сохраняем в переменную класс с параграфом для вывода сообщений
    let message = $(this).find(".contact-form__message");

    let fd = new FormData(form);
    $.ajax({
      url: "./php/send-message-to-telegram.php",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      success: function success(res) {
        let respond = $.parseJSON(res);
        if (respond.err) {
          message.html(respond.err).css("color", "#FFF");
          // setTimeout(() => {
          //   message.text("");
          // }, 3000);
        } else if (respond.okSend) {
          message.html(respond.okSend).css("display", "flex");
          $("#form-contact").trigger("reset");
          // setTimeout(() => {
          //   message.text("");
          // }, 3000);
        } else {
          alert("Необработанная ошибка. Проверьте консоль и устраните.");
        }
      },
    });
  });
})(jQuery);
