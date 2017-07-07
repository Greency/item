/*思路：
 1.字符是数字，添加到输出队列。
 2.字符是运算符，如果当前运算符的优先级大于前一个运算符，则加入栈中；
 如果当前运算符的优先级小于等于前一个运算符，则将栈中的运算符全部取出，再将当前运算符加入栈中。
 3.字符是左括号，加入栈中。
 4.字符是右括号，将栈中左括号之前的所有运算符依次添加到输出队列。
 5.最后形成输出队列，依次将运算符前两位数字进行相应的运算，最后得出结果。
 */

/*需考虑的误操作：
 1.用户连续输入多个运算符。
 2.用户输入括号时不匹配。
 3.用户进行除法操作时除数为0。
 4.用户在输入时出现类似情况：2+2+，当用户点击“=”进行计算时。
 5.用户计算0.2 + 0.1 结果不符合。
 */

var Calculator = function () {
    "use strict"
    var btn, showTextarea; //按钮 ， 显示内容的区域
    var textString = ""; //储存在计算器界面显示的字符串
    var numString = ""; //储存一个完整的操作数
    var flagNumStringNumber = 0;  //退格操作的判断，作用是判断是否退格了一个完整的操作数
    var beforeElementText = "";  //暂时储存前一个字符,作用是防止2个及以上连续的运算符
    var stack = [], //存放运算符的栈空间
        dataBefore = [], //存放最开始的数据
        dataAfter = []; //存放后缀变换完成后的数据

    //初始化
    this.init = function () {
        this.getElement()
        this.addListener()
    }

    //获取按钮元素
    this.getElement = function () {
        btn = document.querySelector("#button")
        showTextarea = document.querySelector("#showTextarea")
    }

    //绑定事件
    this.addListener = function () {
        var self = this
        btn.addEventListener("click", function (e) {
            var el = e.target  //获取被点击的元素
            self.verifyInput(el)
        })
    }

    //根据用户的输入执行相应的操作
    this.verifyInput = function (element) {
        var elementText = element.innerText
        //判断小数点
        if (elementText === ".") {
            numString += elementText
            //防止小数点前没有数字和多个小数点的出现
            var length = (numString.match(/(\.)/g)).length
            if (length < 2) {
                textString += elementText
            }
        }

        //判断是否为正负数
        if (elementText === "-/+") {

        }

        //判断是否为数字字符
        if (/\d/.test(elementText)) {
            numString += elementText
            textString += elementText
        }

        //判断是否为运算符且不能连续的运算符
        if (/[x/%+-]|\(|\)/.test(elementText) && !/[x/%+-]|\(|\)/.test(beforeElementText)) {
            if (elementText !== "-/+") {
                this.storeData(numString, "add")
                numString = ""
                this.storeData(elementText, "add")
                textString += elementText
            }
        }

        //退格操作
        if (elementText === "<") {
            var length = textString.length
            //在退格的过程中判断是否完全的删除了一个数
            var tempOperator = textString.substring(length - 1, length)
            textString = textString.substring(0, length - 1)
            if (/[x/%+-]/.test(tempOperator)) {
                this.storeData(null, "delete")
                numString = dataBefore[dataBefore.length - 1]
                this.storeData(null, "delete")
            } else {
                numString = numString.substring(0, numString.length - 1)
            }
        }

        //清除
        if (elementText === "C") {
            textString = ""
        }
        beforeElementText = elementText
        this.show()
    }

    //向数组中进行数据的添加，删除
    this.storeData = function (str, type) {
        //str:要向数组中储存的字符；type:表示要进行的操作，如添加，删除
        switch (type) {
            case "add":
                dataBefore.push(str)
                break;
            case "delete":
                dataBefore.pop()
                break;
        }
    }

    //后缀式的转变

    //计算
    this.computer = function () {

    }

    //在屏幕上显示
    this.show = function () {
        showTextarea.innerText = textString
    }

    this.init()


}

new Calculator()


