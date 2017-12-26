/**
 * 模拟一个队列，队列的每个元素是一个数字，初始队列为空
 * 有一个input输入框，以及4个操作按钮
 * 点击"左侧入"，将input中输入的数字从左侧插入队列中；
 * 点击"右侧入"，将input中输入的数字从右侧插入队列中；
 * 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
 * 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
 * 点击队列中任何一个元素，则该元素会被从队列中删除
 * 
 * 使用对象关联模式风格
 * 
 */
(function IIFE(){
    /**
     * 返回className，为了方便获取DOM的元素
     * @param  string
     * @return htmlElement
     * @yip
     */
    var $ = function(className) {
        return document.getElementsByClassName(className);
    };

    /**
     * 获取DOM元素
     * @param  elemsHTML
     * @return null
     * @yip
     */

    var btns = $("c-panel__button");
    var output = $("c-output")[0];
    

    /**
     * 队列对象
     * @param  string
     * @return null
     * @yip
     */
    var Queue = {
        arr: [],
        rightIn: function(num) {
            this.arr.push(num);
            this.addSpan();
        },

        leftIn: function(num) {
            this.arr.unshift(num);
            this.addSpan();
        },
        isEmpty: function() {//boolean
            return (this.arr.length === 0);
        },
        rightOut: function() {
            if(this.isEmpty()){
                alert("It‘s empty");
                return false;
            }else{
                alert(this.arr.pop());
                this.addSpan();
            }
        },

        leftOut: function() {
            if(this.isEmpty()){
                alert("It‘s empty");
                return false;
            }else{
                alert(this.arr.shift());
                this.addSpan();

            }
        },

        addSpan: function() {
            var str = "";
            this.arr.forEach(function(item){
                str += ("<span class= \"c-output__span\">" + parseInt(item) + "</span>");
            });
            output.innerHTML = str;
            //每增加一个span或者删除一个span，都要将数组更新
            addDeleteFn();
        },

        deleteSpan: function(id){
            alert(this.arr[id] + " was deleted");
            this.arr.splice(id,1);
            this.addSpan();
        }

    };

     /**
     * 通过addDeleteFn函数遍历所有output内的小方格，并给每个小方块绑定删除事件
     * @param 
     * @return null
     * @yip
     */   
    function addDeleteFn() {
        for(var i=0; i<output.childNodes.length; i++) {
            //这里用了IIFE+闭包，也可以使用let关键字声明+闭包（反正就是块级作用域+闭包）
            (function(j){
                output.childNodes[j].addEventListener("click", function(){
                    Queue.deleteSpan(j);
                }, false);
            })(i);
        }
    } 
    

    /**
     * 事件绑定
     * @param
     * @return null
     * @yip
     */


    btns[0].addEventListener("click", function(){
        var input = $("c-panel__input")[0].value;
        if(/^\d{0,2}$/.test(parseInt(input))){
            Queue.leftIn(input);
        }else{
            alert("please input a correct number")
        }
    }, false);

    btns[1].addEventListener("click", function(){
        var input = $("c-panel__input")[0].value;
        if(/^\d{0,2}$/.test(parseInt(input))){
            Queue.rightIn(input);
        }else{
            alert("please input a correct number")
        }
    }, false);

    btns[2].addEventListener("click", function(){Queue.leftOut();}, false);
    btns[3].addEventListener("click", function(){Queue.rightOut();}, false);
})();
