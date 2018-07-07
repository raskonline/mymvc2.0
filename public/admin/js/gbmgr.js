$(function () {
    $("#table").bootstrapTable({ // 对应table标签的id
        url: "index.php?g=admin&c=gb&a=list", // 获取表格数据的url
        cache: false, // 禁用 AJAX 数据缓存， 默认为true
        striped: true,  //隔行变色，默认为false
        pagination: true, // 在表格底部显示分页组件，默认false
        pageList: [10, 20], // 设置页面可以显示的数据条数
        pageSize: 10, // 页面大小
        pageNumber: 1, // 首页页码
        sidePagination: 'server', // 设置为服务器端分页
        queryParams: function (params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
            return {
                pageSize: params.limit, // 每页要显示的数据条数
                pageIndex: (params.offset / params.limit) + 1,   //页码
                like: params.search //获取搜索框内容

            }
        },
        search: true, //启用搜索
        columns: [
            {
                checkbox: true, // 显示一个勾选框
                field: 'id',
                align: 'center' // 居中显示
            }, {
                field: 'uname', // 返回json数据中的name
                title: '姓名', // 表格表头显示文字
                align: 'center', // 左右居中
                valign: 'middle', // 上下居中
                width: 160
            }, {
                field: 'uemail',
                title: '邮箱',
                align: 'center',
                valign: 'middle',
                width: 180
            }, {
                field: 'uphone',
                title: '电话',
                align: 'center',
                valign: 'middle',
                width: 180
            }, {
                field: 'umessage',
                title: '留言',
                align: 'left',
                valign: 'middle'
            }, {
                title: "操作",
                align: 'center',
                valign: 'middle',
                width: 160, // 定义列的宽度，单位为像素px
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-sm" onclick="del(\'' + row.id + '\')">删除</button>';
                }
            }
        ],
        onLoadSuccess: function () {  //加载成功时执行

        },
        onLoadError: function () {  //加载失败时执行
            alert("数据加载失败！");
        }

    });

    /**根据id删除留言*/
    function del(id) {
        alert("确定要删除该条记录吗？");
        $.post(
            'index?g=admin&c=gb&a=del',
            {"id": id},
            function (data) {
                if (data.errno == 200) {
                    alert(data.mess + "\n点击确认返回留言管理页！");
                    window.location.href = "index.php?g=admin&c=main&a=gbmgr";
                } else {
                    var flag = confirm(data.mess);
                    window.location.href = "index.php?g=admin&c=main&a=gbmgr";
                }
            },
            "json"
        );
    }

});