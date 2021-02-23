<?php
// Автор: Дмитрий Давыдов
// Материал с сайта https://smartlanding.biz/otpravka-dannyx-formy-v-telegram.html
$msgs = [];
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $token = "1195246232:AAHTjNkeLWQw4wCFW9DbFcXWZ9PsyL8x0Jc";
    $chat_id = "-487741813";

    if (!empty($_POST['name']) && !empty($_POST['phone'])){
        $bot_url = "https://api.telegram.org/bot{$token}/";
        $urlForPhoto = $bot_url . "sendPhoto?chat_id=" . $chat_id;

        if(!empty($_FILES['file']['tmp_name'])) {

            // Путь загрузки файлов
            $path = $_SERVER['DOCUMENT_ROOT'] . '/telegramform/tmp/';

            // Массив допустимых значений типа файла
            $types = array('image/gif', 'image/png', 'image/jpeg');

            // Максимальный размер файла
            $size = 1024000;

            // Проверяем тип файла
             if (!in_array($_FILES['file']['type'], $types)) {
                 $msgs['err'] = 'Запрещённый тип файла.';
                echo json_encode($msgs);
                die();
             }

             // Проверяем размер файла
             if ($_FILES['file']['size'] > $size) {
                 $msgs['err'] = 'Слишком большой размер файла.';
                echo json_encode($msgs);
                die('Слишком большой размер файла.');
             }

             // Загрузка файла и вывод сообщения
             if (!@copy($_FILES['file']['tmp_name'], $path . $_FILES['file']['name'])) {
                 $msgs['err'] = 'Что-то пошло не так. Файл не отправлен!';
                 echo json_encode($msgs);
             } else {
                $filePath = $path . $_FILES['file']['name'];
                $post_fields = array('chat_id' => $chat_id, 'photo' => new CURLFile(realpath($filePath)) );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_HTTPHEADER, array( "Content-Type:multipart/form-data" ));
                curl_setopt($ch, CURLOPT_URL, $urlForPhoto);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
                $output = curl_exec($ch);
                unlink($filePath);
             }
        }

        if (isset($_POST['name'])) {
          if (!empty($_POST['name'])){
            $name = "Имя: " . strip_tags($_POST['name']) . "%0A";
          }
        }

        if (isset($_POST['phone'])) {
          if (!empty($_POST['phone'])){
            $phone = "Телефон: " . "%2B" . strip_tags($_POST['phone']) . "%0A";
          }
        }

        if (isset($_POST['site'])) {
          if (!empty($_POST['site'])){
            $site = "Сайт: " .strip_tags($_POST['site']) . "%0A";
          }
        }
        if (isset($_POST['text'])) {
          if (!empty($_POST['text'])){
            $text = "Сообщение: " .strip_tags($_POST['text']) . "%0A";
          }
        }
        // Формируем текст сообщения
        $txt = $name . $phone . $site . $text;

        $sendTextToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");
        if ($output && $sendTextToTelegram) {
            $msgs['okSend'] = 'Станция StarLink приняла ваше послание!';
            echo json_encode($msgs);
        } elseif ($sendTextToTelegram) {
            $msgs['okSend'] = 'Станция StarLink приняла ваше послание!';
            echo json_encode($msgs);
          return true;
        } else {
            $msgs['err'] = 'Ошибка связи. Сообщение не отправлено!';
            echo json_encode($msgs);
            die('Ошибка. Сообщение не отправлено!');
        }

    } else {
        $msgs['err'] = 'Ошибка. Вы заполнили не все обязательные поля!';
        echo json_encode($msgs);;
    }
} else {
  header ("Location: /");
}
?>