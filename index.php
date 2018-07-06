<?php
//入口文件
//1.加载配置文件和常量
require_once "configs/config.php";
require_once "configs/constants.php";

require_once 'core/PHPMailer/class.phpmailer.php';
require_once 'core/PHPMailer/class.smtp.php';

//2.引入smarty
require_once 'core/smarty/Smarty.class.php';

//3.注册自动加载方法
require "core/MyLoad.class.php";
\core\MyLoad::registerAutoLoad();

//4.启动核心运行类(前端处理器)
\core\Application::run();



