window.addEventListener("load",load);
console.log("todolist running...");
//clear();
var All = 1;
var Active = 0;
var Completed = 0;
var TogAll = false;
var clearCom = document.getElementsByClassName("clear-completed")[0];
var togall = document.getElementsByClassName("toggle-all")[0];
var bottom = document.getElementById("bottom");
var list = document.getElementById("box");
document.getElementById("newItem").onkeypress = function(event) {
    if(event.keyCode == 13){
        document.getElementById("newItem").value = document.getElementById("newItem").value.trim();
        if(document.getElementById("newItem").value.length===0){
            alert("事件不能为空");
        }
        else {
            addTodoList();
        }
    }
}
document.getElementById("bottom").onclick = function(event){
    var t = event.target;
    if(t.className=="" && t.parentNode.parentNode.parentNode.className=="bottom"){
        p = t.parentNode.parentNode;
        p.children[0].children[0].className="";
        p.children[1].children[0].className="";
        p.children[2].children[0].className="";
        t.className="selected";
        if(p.children[0].children[0].className=="selected"){
            All=1;
            Active=0;
            Completed=0;
        }else  if(p.children[1].children[0].className=="selected"){
            All=0;
            Active=1;
            Completed=0;
        }else if(p.children[2].children[0].className=="selected"){
            All=0;
            Active=0;
            Completed=1;
        }
        load();
    }
}
function showDelete(i){
    if(document.getElementById("item-"+i).children[3].style.display!="block"){
        var x = document.getElementById("item-"+i).children[2];
        x.style.display="block";
    }
}
function hideDelete(i){
    var x = document.getElementById("item-"+i).children[2];
    x.style.display="none";
}

function changeStatus(i){
    var x=document.getElementById("item-"+i).children[0];
    if(x.className=="todo"){
        x.className="done";
        updateItem(i,"done",true);
    }
    else if(x.className=="done"){
        x.className="todo";
        updateItem(i,"done",false);
    }
}


function load(){
    var listString = "";
    var todoCount = 0;
    var doneCount = 0;
    document.getElementById("newItem").focus();
    todolist = loadData();
    if(todolist.length!=0){
        listString +='<ul id="itemlist" class="itemlist" max-height: "400px">';
        for(var i = 0 ; i<todolist.length ; i++){
            if(todolist[i].done == false){
                if(All || Active){
                    todoCount ++;
                    listString += '<li><div id="item-'+i+'"onmouseover="showDelete('+i+')" onmouseout="hideDelete('+
                    i+')"><span class="todo" onclick="changeStatus('+i+')">&#xe6eb;</span><label ondblclick="edit('+i+')">'
                    +todolist[i].text+'</label><span class="delete" onclick="removeItem('+
                    i+')">&#xe6a6;</span><input type="text" class="edit-text" display="none" onblur="hideit('+i+',1)" onkeypress="hideit('+i+',0)"></div></li>';
                }
            }
            else{
                if(All || Completed){
                    doneCount++;
                    listString += '<li><div id="item-'+i+'"onmouseover="showDelete('+i+')" onmouseout="hideDelete('+
                    i+')"><span class="done" onclick="changeStatus('+i+')">&#xe6a1;</span><label>'
                    +todolist[i].text+'</label><span class="delete" onclick="removeItem('+
                    i+')">&#xe6a6;</span><input type="text" class="edit-text" display="none"  onblur="hideit('+i+',1)" onkeypress="hideit('+i+',0)"></div></li>';
                }
            }
        }
        if(doneCount){
            clearCom.style.display = "block";
        }else{
            clearCom.style.display = "none";
        }
        if(todoCount == 0){
            togall.style.color= "black";
        }else{
            togall.style.color= "#eee";
        }
        listString += "</ul>";
        list.innerHTML = listString;
        bottom.style.display="block";
        togall.style.display="block";
    }else{
        list.innerHTML = "";
        bottom.style.display="none";
        togall.style.display="none";
    }

    var count = document.getElementById("bottom");
    count.children[0].innerHTML = "<strong>"+todoCount+"</strong> items left";
}


function addTodoList(){
    var newItem ={
        text:"",
        done:false
    };
    //得到新的一个结点
    newItem.text = document.getElementById("newItem").value;
    newItem.done = false;
    todolist.unshift(newItem);
    //保存结点至列表
    saveData(todolist);

    //初始化输入框
    document.getElementById("newItem").value = "";
    load();
    document.getElementById("newItem").focus();//获取焦点

}


function tog(){
    if(TogAll == false){
        for(var i = 0 ; i<todolist.length ; i++)
            todolist[i].done=true;
        TogAll = true;
        saveData(todolist);
        load();
        togall.style.color= "black";
    }else if(TogAll == true){
        for(var i = 0 ; i<todolist.length ; i++)
            todolist[i].done=false;
        TogAll = false;
        saveData(todolist);
        load();
        togall.style.color= "#eee";
    }
}


function clearall(){
    if(TogAll == false){
        var todo = loadData();
        for(var i = 0 ; i<todo.length ;)
        {
            if(todo[i].done == true)
            {
               todo.splice(i,1);
            }else i++;
        }
        saveData(todo);
        load();
    }else if(TogAll == true){
        clear();
    }

}

function updateItem(i, field, value) {
    todolist[i][field] = value;
    saveData(todolist);
    load();
}

function removeItem(i) {
    todolist.splice(i, 1);
    saveData(todolist); //相同名称的缓存会覆盖，更新缓存
    load();

}

function saveData(data) {
    localStorage.setItem("mytodolist", JSON.stringify(data));   //JS对象转换成JSON对象存进本地缓存
}

function loadData() {
    var hisTory = localStorage.getItem("mytodolist");
    if(hisTory !=null){
        return JSON.parse(hisTory);     //JSON对象转换为JS对象
    }
    else { return []; }
}
function clear() {
    localStorage.clear();
    load();
}

// document.getElementById("bottom").onmouseover = function(){
//     var x=document.getElementById("abc");
//     x.style.display="block"
// }
// document.getElementById("bottom").onmouseout = function(){
//     var x=document.getElementById("abc");
//     x.style.display="none"
// }
function edit(i){
    var p = document.getElementById("item-"+i);
    p.children[0].style.display="none";
    p.children[1].style.display="none";
    //p.children[2].style.display="none";
    p.children[3].style.display="block";
    p.children[3].value = p.children[1].textContent;
    p.children[3].focus();
}

function hideit(i,stat){
    if(stat==1 || event.keyCode ==13){
        var p = document.getElementById("item-"+i);
        p.children[3].value = p.children[3].value.trim();
        p.children[0].style.display="block";
        p.children[1].style.display="block";
        //p.children[2].style.display="block";
        p.children[3].style.display="none";
        if(p.children[3].value.length!=0)
        updateItem(i,"text",p.children[3].value);
    }
}