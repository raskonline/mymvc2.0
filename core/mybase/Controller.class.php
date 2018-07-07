<?php

namespace core\mybase;

use core\Application;

/**控制器基类*/
class Controller
{
    protected $view;//视图对象
    protected $smarty;//模板引擎

    /**子类对象如果没有定义 __construct()，子类在实例化的时候会自动调用父类 __construct()。*/
    public function __construct()
    {
        $this->initView();//初始化视图
        $this->initSmarty();//初始化smarty
    }

    /**初始化视图*/
    private function initView()
    {
        //初始化视图对象
        $this->view = new View();
        // 视图模板的路径： application/home/views/index/index.html
        $this->view->view_dir = "application/" . Application::$group . "/views/" . strtolower(Application::$controller) . "/";
    }

    /**调用视图对象呈现视图方法*/
    protected function display($view_name = null)
    {
        $view_name = isset($view_name) ? $view_name : Application::$action;//视图名称默认为方法名称
        $view_name = $view_name . ".html";
        //$this->view->display($view_name);
        $this->smarty->display($view_name);
    }

    /**调用视图对象数据填充方法*/
    protected function assign($name, $value)
    {
        //$this->view->assign($name, $value);
        $this->smarty->assign($name, $value);
    }

    /**初始化smarty*/
    private function initSmarty()
    {
        //初始化smarty
        $this->smarty = new \Smarty();
        //设置模板路径
        $this->smarty->setTemplateDir("application/" . Application::$group . "/views/" . strtolower(Application::$controller) . "/");
        //设置混编文件路径
        $this->smarty->setCompileDir("runtime/" . Application::$group . "/" . strtolower(Application::$controller) . "/");
        //设置分隔符
        //$this->smarty->setLeftDelimiter("<{");
        //$this->smarty->setRightDelimiter("}>");
        //或者把js或者css代码放在{literal}{/literal}之间
    }
}