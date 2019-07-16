/**
 *  //仿照jQuery，封装一个js文件
 *  //该js拥有的功能
 *  //1.获取元素
 *  //2.获取样式
 *  //3.操作类名: addClass/removeClass/toggleClass
 *  //4.遍历
 *  //5.注册事件
 *  //6.链式编程
 * 
 * **/

;
(function () {
    //先找出实例函数
    function jQuery(selector) {
        return new Init(selector);
    }

    //原生调用元素,jq对象要求是个伪数组，selector是个伪数组，要遍历，取出每个元素，将转换成自己的东西
    function Init(selector) {
        let dom = document.querySelectorAll(selector);
        for (i = 0; i < dom.length; i++) {
            this[i] = dom[i];
        }
        //伪数组需要一个长度
        this.length = dom.length;
    }

    //原型函数给样式
    //jq里的对象.css()有两种情况
    //两个值得时候是给这个属性名添加属性值,一个值得时候是获取这个属性名
    Init.prototype.css = function (property, value) {
        if (value == undefined) {
            return getComputedStyle(this[0])[property];
        } else {
            //先有一个数组，里面储存了所有需要带单位的属性
            let pxArr = ['width','height','top','left'];
            for (i = 0; i < this.length; i++) {
                //这是带px单位
                if(pxArr.indexOf(property) !== -1){
                    //带px单位之余，需要判断客户会不会乱输入
                    if(value.toString().indexOf('px') === -1){
                        this[i].style[property] = value + 'px';
                    }else{
                        this[i].style[property] = value;
                    }
                }else{
                    //这是不带px单位，直接输出
                    this[i].style[property] = value;
                }
            }
            //返回this。因为实现jq的链式编程
            return this;
        }
    }


    //增加类名
    Init.prototype.addClass = function (className) {
        this.each(function (i, e) {
            e.classList.add(className)
        })
        return this
    }


    //删除类名
    Init.prototype.removeClass = function (className) {
        for (i = 0; i < this.length; i++) {
            this[i].classList.remove(className)
        }
    }

    //切换类名
    Init.prototype.toggleClass = function (className) {
        for (i = 0; i < this.length; i++) {
            this[i].classList.toggle(className);
        }
    }

    //遍历???callback
    Init.prototype.each = function (callback) {
        for (i = 0; i < this.length; i++) {
            callback(i, this[i]);
        }
    }


    window.$ = window.jQuery = jQuery;
})();
