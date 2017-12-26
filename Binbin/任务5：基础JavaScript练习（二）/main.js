/**
 * 模拟一个队列，队列的每个元素是一个数字，初始队列为空
 * 有一个input输入框，以及4个操作按钮
 * 点击"左侧入"，将input中输入的数字从左侧插入队列中；
 * 点击"右侧入"，将input中输入的数字从右侧插入队列中；
 * 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
 * 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
 * 点击队列中任何一个元素，则该元素会被从队列中删除
 * 
 * 基于task4
 * 限制输入的数字在10-100(done)
 * 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示(done)
 * 队列展现方式变化如图，直接用高度表示数字大小
 * 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料
 * 
 */
(function IIFE() {
    /**
     * 返回className，为了方便获取DOM的元素
     * @param  string
     * @return htmlElement
     * @yip
     */
    var $ = function (className) {
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
     * @param  anything
     * @return null
     * @yip
     */
    var Queue = {
        arr: [],
        rightIn: function (num) {
            if (this.arr.length < 60) {
                this.arr.push(num);
                this.addSpan();
            } else {
                alert("Too much!");
                return false;
            }
        },

        leftIn: function (num) {
            if (this.arr.length < 60) {
                this.arr.unshift(num);
                this.addSpan();
            } else {
                alert("Too much!");
                return false;
            }
        },
        isEmpty: function () { //boolean
            return (this.arr.length === 0);
        },

        rightOut: function () {
            if (this.isEmpty()) {
                alert("It‘s empty");
                return false;
            } else {
                alert(this.arr.pop() + " was deleted");
                this.addSpan();
            }
        },

        leftOut: function () {
            if (this.isEmpty()) {
                alert("It‘s empty");
                return false;
            } else {
                alert(this.arr.shift() + " was deleted");
                this.addSpan();
            }
        },

        addSpan: function () {
            //打算换一种方式来做，这种修改style的方式不太好
            var str = "";
            this.arr.forEach(function (item) {
                str += ("<span class= \"c-output__span\" style=\"height:" + parseInt(item) * 2 + "px\">" + parseInt(item) + "</span>");
            });
            output.innerHTML = str;
            //每增加一个span或者删除一个span，都要将数组更新
            this.addDeleteFn();
        },

        deleteSpan: function (id) {
            alert(this.arr[id] + " was deleted");
            this.arr.splice(id, 1);
            this.addSpan();
        },

        //将遍历每一个span，并绑定一个点击事件，用于删除单个span元素
        addDeleteFn: function () {
            for (var i = 0; i < output.childNodes.length; i++) {
                //这里用了IIFE+闭包，也可以使用let关键字声明+闭包（反正就是块级作用域+闭包）
                (function (j) {
                    output.childNodes[j].addEventListener("click", function () {
                        Queue.deleteSpan(j);
                    }, false);
                })(i);
            }
        },

        randomGenerateSpans: function () {
            this.arr.length = 0;
            for (var i = 0; i <= 20; i++) {
                this.arr.push(Math.floor(Math.random() * 91 + 10));
            }
            this.addSpan();
        },

        sort: function (fn) {
            this.arr.sort(fn);
            this.addSpan();
        },


        // 可视化排序（写出3种出来好啦）
        bubbleSort1: function () {
            var Clock;  //Clock用来存储 setInterview 的 ID
            var count = 0,
                i = 0;
            //分析这里用 this 和 Queue 区别在哪？
            console.log(this.arr.length);

            Clock = setInterval(function () {
                if (count >= Queue.arr.length) {
                    clearInterval(Clock);   //用于 clearInterval
                }
                if (i == Queue.arr.length - 1 - count) {
                    i = 0;
                    count++;
                }
                if (Queue.arr[i] > Queue.arr[i + 1]) {
                    var temp = Queue.arr[i];
                    Queue.arr[i] = Queue.arr[i + 1];
                    Queue.arr[i + 1] = temp;
                    Queue.addSpan();
                }
                i++;
            }, 100);
        },

        bubbleSort2: function() {
            var animationArr = [];  //这个数组用来记录帧数
            // 下面是冒泡算法的具体过程，在排序的过程中，记录帧
            
            return animationArr;    //返回帧数组
        }

    };


    /**
     * 事件绑定
     * @param
     * @return null
     * @yip
     */


    btns[0].addEventListener("click", function () {
        var input = $("c-panel__input")[0].value;
        if (/100|(^\d{2}$)/.test(parseInt(input))) {
            Queue.leftIn(input);
        } else {
            alert("please input a correct number");
        }
    }, false);

    btns[1].addEventListener("click", function () {
        var input = $("c-panel__input")[0].value;
        if (/100|(^\d{2}$)/.test(parseInt(input))) {
            Queue.rightIn(input);
        } else {
            alert("please input a correct number");
        }
    }, false);

    btns[2].addEventListener("click", function () {
        Queue.leftOut();
    }, false);

    btns[3].addEventListener("click", function () {
        Queue.rightOut();
    }, false);

    btns[4].addEventListener("click", function () {
        Queue.sort(function compare(num1, num2) {
            return num1 - num2;
        });
    }, false);

    btns[5].addEventListener("click", function () {
        Queue.randomGenerateSpans();
    }, false);

    btns[6].addEventListener("click", function () {
       Queue.bubbleSort();
    }, false);
})();