/**
 * 一个实现轮播图的类，需使用一定css样式
 * new Slider(document.getElementById('容器'),['图片1','图片2',...])
 * @param {*} container 一个存放轮播图的容器div
 * @param  {...any} imgUrl 轮播图的地址
 */

function Slider(container,...imgUrl){
    //轮播图的基本信息
    var sliderAmount = imgUrl.length;//图片数量
    var sliderWidth = 800;//图片宽度
    var sliderHeight = 450;//图片高度

    //初始化容器的大小
    container.style.width = sliderWidth + "px";
    container.style.sliderHeight = sliderHeight + "px";

    //新建轮播图片的列表
    var newUl = document.createElement("ul");
    newUl.className = "slider";
    newUl.style.width = imgUrl.length * sliderWidth +"px";
    container.appendChild(newUl);

    //给Ul加入图片newLi
    for(var i=0 ; i<imgUrl.length ; i++){
        var newLi = document.createElement("li");
        newLi.setAttribute("id","slider-"+i);
        newLi.innerHTML = '<a href="#"><img src="'+imgUrl[i]+'" alt=""></a>';
        newUl.appendChild(newLi);
    }

    //左翻按钮
    var lRow = document.createElement("a");
    lRow.className = "leftRow";
    lRow.setAttribute("href","#");
    lRow.innerHTML = '<span><</span>';
    container.appendChild(lRow);

    //右翻按钮
    var rRow = document.createElement("a");
    rRow.className = "rightRow";
    rRow.setAttribute("href","#");
    rRow.innerHTML = '<span>></span>';
    container.appendChild(rRow);

    //轮播图下方白点列表
    var newUl2 = document.createElement("ul");
    newUl2.className = "dotlist";
    container.appendChild(newUl2);
    for(var i=0 ; i<imgUrl.length ; i++){
        var newDotLi = document.createElement("li");
        newDotLi.innerHTML = '<a href="#"><p class="dot"></p></a>';
        newUl2.appendChild(newDotLi);
    }
    newUl2.children[0].children[0].children[0].style.backgroundColor="#fff";//默认选定第一个点

    /**
     * 下方代码是具体功能的实现
     */
    var leftRow = document.getElementsByClassName("leftRow")[0];//左箭头
    var rightRow = document.getElementsByClassName("rightRow")[0];//右箭头
    var slider = document.getElementsByClassName("slider")[0];//轮播图主体ul
    var i = 0;//初始化当前位置

    //向左翻页
    function turnLeft(){
        i += sliderAmount-1;
        i = i % sliderAmount;
        if(i>0 && i<sliderAmount){
            var si =(sliderWidth * i);
            slider.style.marginLeft="-"+si+"px";
            turnImg(i);
        }else{
            slider.style.marginLeft="0";
            i = 0;
            turnImg(i);
        }
    }

    //向右翻页
    function turnRight(){
        i += 1;
        i = i % sliderAmount;
        if(i>0 && i<sliderAmount){
            var si = sliderWidth * i;
            slider.style.marginLeft="-"+si+"px";
            turnImg(i);
        }else{
            slider.style.marginLeft=0;
            i=0;
            turnImg(i);
        }
    }

    //自动轮播，以毫秒单位。此处3秒一次
    timeId = setInterval(turnRight,3000);

    //鼠标点击时暂停自动轮播。无操作3秒后自动恢复
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

    //点击圈圈切换
    newUl2.onclick = function(event){
        var t = event.target;
        if(t.tagName == "P"){
            var Index =[].indexOf.call(t.parentNode.parentNode.parentNode.children, t.parentNode.parentNode);
            i = Index ;//取li在ul的索引获得轮播图当前位置
            if(timeId){
                clearInterval(timeId);  
                timeId=null;
            }
            if(i>0 && i<sliderAmount){
                var si = sliderWidth * i;
                slider.style.marginLeft="-"+si+"px";
            }else{
                slider.style.marginLeft=0;
                i=0;
            }
            turnImg(i);
            timeId=setInterval(turnRight,3000);
        }
    }

    //切换白点
    function turnImg(i){
        for(var j=0;j<sliderAmount;j++){
            if(j!=i){
                newUl2.children[j].children[0].children[0].style.backgroundColor="transparent";
            }else newUl2.children[j].children[0].children[0].style.backgroundColor="#fff";
        }
    }
}

var newslider  = new Slider(document.getElementsByClassName
    ("slider-box2")[0],'./code1.png','./code2.png','./code3.png',
    './code4.png','./code5.png','./code6.png','./code7.png','./code8.png','./code9.png'
    ,'./code10.png','./code11.png','./code12.png','./code13.png','./code14.png','./code15.png'
    );

var newslider  = new Slider(document.getElementsByClassName
    ("slider-box")[0],'./code1.png','./code2.png','./code3.png',
    './code4.png','./code5.png','./code6.png','./code7.png','./code8.png','./code9.png'
    ,'./code10.png');