//注意每次调用$.get()或者$.post()或$.ajax()的时候，
//会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})