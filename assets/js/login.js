$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    var form = layui.form
        //通过form.verify()函数自定义校检规则
    form.verify({
            //自定义一个叫psd校检规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码是否一致
            repwd: function(value) {
                var pwd1 = $('#qq input').val();
                if (pwd1 !== value) {
                    return '两次输入的密码不一致'
                }

            }
        })
        //注册表格监听事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            //获取表单中的所有内容
            var data = $(this).serialize();
            $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
                layer.msg(res.message)
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                $('#link_login').click()
            })
        })
        // 登录表格监听事件 
    var data = {
            username: $('#form_login[name=username]').val(),
            password: $('#form_login[name=password]').val()
        }
        // var data = {
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        //   }
        // $('#form_login').submit(function(e) {
        //     e.preventDefault(),
        //         $.post('http://ajax.frontend.itheima.net/api/login', data, function() {
        //             if (res.status !== 0) {
        //                 return console.log(res.message);
        //             }
        //         })
        // })

    $('#form_login').submit(function(e) {
        //阻止默认行为
        e.preventDefault();
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功!')
                    //将登录成功得到的token字符串保存到localstorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})