<?php
header('HTTP/1.1 200 Internal Server Error');
$arr = [
  'get' => $_GET,
  'post' => $_POST,
  'file' => $_FILES,
  'arr' => [1,3,4,5],
  'bool' => true,
  'method' => $_SERVER['REQUEST_METHOD']
];

echo json_encode($arr);
