"use strict";
var Calculator = function(){
    var list = null;
    var result ="";// 储存在显示框中显示的东西
    this.flag = true;//记录是否完成一次运算 
    this.textCope = "";// 储存text的上一个值 为了后面的show方法中的判断做准备 防止连续出现多个运算符
    this.num = /\d/;
    this.ope = /\D/;
    this.reOpeOne =/[x/%]/; //匹配 x / %
    this.numString="";// 记录数字字符
   
    //初始化
    this.init = function(){       
        var btn = document.getElementsByTagName("td");
        this.addListener(btn);
    }
    //添加事件
    this.addListener = function(obj){
        var self = this;
        var tempString = "";
        for(var i = 0;i<obj.length;i++){
            obj[i].addEventListener("click",function(){
                self.action(this);
            });
        }
    }
    //具体行为
    this.action = function(obj){
        if(list === null) list = new List();

                //当完成一次运算后 若再次输入的是数字则清空原来的数据，若输入的不是数字 则把上一次得到的结果当成这次运算的一个操作数
                if(!this.flag&&this.num.test(obj.innerText)){
                    result = ""; 
                    this.numString = "";
                    this.textCope ="";
                }
                if(obj.innerText==="="){
                    this.cut(obj.innerText);
                    this.computer();
                    this.flag = false;                    
                }else if(obj.innerText==="C"){
                    result = ""; // C 表示清空
                    this.numString = "";
                    this.textCope ="";
                    document.getElementById("show").innerText=result;
                }else if(obj.innerText==="<-"){// <-表示后退一个
                    var stringNum = result.length; 
                    result = result.substring(0,stringNum-1); 
                    document.getElementById("show").innerText = result; //截取字符串
                    if(this.numString===""){
                        list.remove(list.size-1);   
                        this.numString = list.getData(list.size-1);
                        list.remove(list.size-1);                        
                    }else{
                        var i = this.numString.length;
                        this.numString = this.numString.substring(0,i-1);             
                    }
                    
                }else{ 
                    this.flag = true;
                    this.show(obj.innerText);
                }
    }
    //显示
    this.show = function(text){
        //判断 最开始输入的只能是数字 而且 运算符不能连续输入 如：56/x||56xx等是错误的
        if(!((this.textCope===""&&this.ope.test(text))||((text===this.textCope)&&this.ope.test(text))||(this.ope.test(text)&&this.ope.test(this.textCope)))){
            result +=text;
            document.getElementById("show").innerText=result;
            this.cut(text);
        }        
        this.textCope = text;
    }
    //截取数字 和 运算符
    this.cut = function(text){
        if(this.num.test(text)||/[.]/.test(text)){
            this.numString += text; //把连续输入的数字分为一组
        }else if(this.ope.test(text)){
            if(this.numString!=="")  
            list.insert(this.numString);   
            list.insert(text);
            this.numString="";
        };
    }
    //计算
    this.computer = function(){
        var sum = 0; //记录运算结果
        var i = -1;//记录运算符的位置
        var tempOne = "";
        
        if (list.size%2) list.remove(list.size-2);//解决出现类似 12+5-3+（多打了运算符） 点击等号运算出现错误的情况 

        //运算符 x / % 的运算
        while(true){
            i +=2;
            tempOne = list.getData(i);
            if(tempOne==="=") break;  
            else if(this.reOpeOne.test(tempOne)){
                switch(tempOne){
                    case "x":
                        sum = parseFloat(list.getData(i-1)) * parseFloat(list.getData(i+1));    
                        list.setData(i-1,sum);         
                        list.remove(i+1);
                        list.remove(i);
                        break;
                    case "/":
                        sum = parseFloat(list.getData(i-1)) / parseFloat(list.getData(i+1));
                        list.setData(i-1,sum);         
                        list.remove(i+1);
                        list.remove(i);
                        break;
                    case "%":
                        sum = parseFloat(list.getData(i-1)) % parseFloat(list.getData(i+1));
                        list.setData(i-1,sum);         
                        list.remove(i+1);
                        list.remove(i);
                        break;
                }
                i = -1;
            }           
        }
        //运算符 + - 的运算
        while(true){
            i +=2;
            tempOne = list.getData(i);
            if(tempOne==="=") break;
            else{
                switch(tempOne){
                    case "+":
                        sum = parseFloat(list.getData(i-1)) + parseFloat(list.getData(i+1));
                        list.setData(i-1,sum);         
                        list.remove(i+1);
                        list.remove(i);
                        break;
                    case "-":
                        sum = parseFloat(list.getData(i-1)) - parseFloat(list.getData(i+1));
                        list.setData(i-1,sum);         
                        list.remove(i+1);
                        list.remove(i);
                        break;
                }
                i = -1;
            }
        }
        result = "";
        this.show(sum);//显示结果
        list = null; //清除链表
    }
}
