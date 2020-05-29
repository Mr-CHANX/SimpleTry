var leftRow = document.getElementsByClassName("leftRow")[0];//左箭头
var rightRow = document.getElementsByClassName("rightRow")[0];//右箭头
var slider = document.getElementsByClassName("slider")[0];//轮播图主体ul
var dotList = document.getElementsByClassName("dotlist")[0];
var aDot = document.getElementsByClassName("active-dot")[0];
var i = 0;//初始化
var sliderAmount = 6;//图片数量
var sliderWidth = 800;//图片宽度

function turnLeft(){//向左
    i += sliderAmount-1;
    i = i % sliderAmount;
    if(i>0 && i<sliderAmount){
        var si =(sliderWidth * i);
        slider.style.marginLeft="-"+si+"px";
        aDot.style.left = (i*32 +305)+"px";
    }else{
        slider.style.marginLeft="0";
        i = 0;
        aDot.style.left = "305px";
    }
}
function turnRight(){//向右
    i += 1;
    i = i % sliderAmount;
    if(i>0 && i<sliderAmount){
        var si = sliderWidth * i;
        slider.style.marginLeft="-"+si+"px";
        aDot.style.left = (i*32 +305)+"px";
    }else{
        slider.style.marginLeft=0;
        i=0;
        aDot.style.left = "305px";
    }
}

timeId = setInterval(turnRight,3000);//自动轮播/毫秒单位，3秒一次
//鼠标点击时暂停轮播3秒然后恢复
rightRow.onclick = function(){
    console.log("right");
    if(timeId){
        clearInterval(timeId);
        timeId=null;
    }
    turnRight();
    timeId = setInterval(turnRight,3000);
}
leftRow.onclick = function(){
    console.log("left");
    if(timeId){
        clearInterval(timeId);  
        timeId=null;
    }
    turnLeft();
    timeId=setInterval(turnRight,3000);
}


dotList.onclick = function(event){
    var t = event.target;
    if(t.tagName == "P"){
        var Index =[].indexOf.call(t.parentNode.parentNode.parentNode.children, t.parentNode.parentNode);
        i = Index ;
        if(timeId){
            clearInterval(timeId);  
            timeId=null;
        }
        if(i>0 && i<sliderAmount){
            var si = sliderWidth * i;
            slider.style.marginLeft="-"+si+"px";
            aDot.style.left = (i*32 +305)+"px";
        }else{
            slider.style.marginLeft=0;
            i=0;
            aDot.style.left = "305px";
        }
        timeId=setInterval(turnRight,3000);
    }
}