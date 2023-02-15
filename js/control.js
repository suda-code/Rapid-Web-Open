document.oncontextmenu = () => {
  return false;
};
document.onselectstart = () => {
  return false;
};
document.oncopy = () => {
  return false;
};


//暂时简单的把右键、选择、复制、掐掉-wyx

window.qqp = 1;
function ofppp() {
  if (window.qqp == 1) {
    window.location.href = "#more_store";
  } else {
    $("#panel3").slideToggle("fast");

  }
}
function getall() {
  window.qqp = 2;
  $("#panel3").slideToggle("fast");
}
function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  console.log(randomString);
  return randomString
}


function openkz() {
  window.location.href = "#cons"
}
function putpm() {

  if (document.getElementById("ptdiv").style.width == "360.5px") {
    document.getElementById("ptdiv").style.width = "1000px"
  } else {
    document.getElementById("ptdiv").style.width = "360.5px"
  }
}
/*
function putsetnone() {
  var ldh = document.getElementById("kj");
  ldh.innerHTML = ``
}
*/
function new_con_iframe() {
  pts = randomString(30, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  // var $newp = $('<iframe src="/" width=150 height=100 id="'+pts+'" />');
  var $newp = $('<div class="rapid-ui-error-iframe" id="' + pts + '" contenteditable="true">为了安全着想，此处已取消显示</div>');
  $('#ptdiv').append($newp);
  $("#" + pts).draggable({ containment: '#ptdiv' });

}

//文字


function new_con_text() {
  pts = randomString(30, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  var $newp = $('<div contenteditable="true" onclick="kzTXT(\'' + pts + '\' )" style="width:fit-content;border: transparent;border-style: none;border: 0;color:#000000; font-size:20px;color:#000000" id="' + pts + '">请输入内容……</div>');
  $('#ptdiv').append($newp);
  $("#" + pts).draggable({ containment: '#ptdiv' });

}
function rgbToHex(rgb) {
  var bg = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return ("#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3])).toUpperCase();
}

function kzTXT(numa) {

  var ldh = document.getElementById("kj");
  var ldh1 = document.getElementById(numa);
  console.log(ldh.style.fontSize)
  ldh.innerHTML = `
     <br><div class="mb-3">
     <label for="exampleFormControlInput1" class="form-label">控件ID</label>
     <input type="text" value="`+ numa + `" class="form-control" id="con1" disabled >
   </div>
   <br><div class="mb-3">
   <label for="exampleFormControlInput1" class="form-label">文本颜色</label>
   <input  type="color" value="`+ rgbToHex(ldh1.style.color) + `" class="form-control" onchange="textset('` + numa + `');" id="con2" >
 </div>
 <br><div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">文字大小</label>
 <input  type="text" value="`+ ldh1.style.fontSize + `" class="form-control" onchange="textset('` + numa + `');" id="con3" >
</div>

    `
}

function textset(numa) {
  var ldh1 = document.getElementById(numa);
  ldh1.style.color = document.getElementById("con2").value;
  ldh1.style.fontSize = document.getElementById("con3").value;
}

//图片

function new_con_image() {
  pts = randomString(30, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  var $newp = $('<img src="./image/image.svg" onclick="kzPIC(\'' + pts + '\' )"  width=100px height=100px id="' + pts + '" contenteditable="true">');
  $('#ptdiv').append($newp);
  $("#" + pts).draggable({ containment: '#ptdiv' });

}
function kzPIC(numa) {

  var ldh = document.getElementById("kj");
  var ldh1 = document.getElementById(numa);
  console.log(ldh.style.fontSize)
  ldh.innerHTML = `
     <br><div class="mb-3">
     <label for="exampleFormControlInput1" class="form-label">控件ID</label>
     <input type="text" value="`+ numa + `" class="form-control" id="con1" disabled >
   </div>
 <br><div class="mb-3">
 <label for="exampleFormControlInput1" class="form-label">图片链接</label>
 <input  type="url" value="`+ ldh1.src + `" class="form-control" onchange="picset('` + numa + `');" id="conp1" >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">图片长度</label>
<input  type="text" value="`+ ldh1.width + `" class="form-control" onchange="picset('` + numa + `');" id="conp2" >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">图片宽度</label>
<input  type="text" value="`+ ldh1.height + `" class="form-control" onchange="picset('` + numa + `');" id="conp3" >
</div>
    `
}
function picset(numa) {
  var ldh1 = document.getElementById(numa);
  ldh1.src = document.getElementById("conp1").value;
  ldh1.width = document.getElementById("conp2").value;
  ldh1.height = document.getElementById("conp3").value;
}


//按钮
function new_con_button() {
  pts = randomString(30, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  var $newp = $('<div class="rapid-ui-button2" style="   color:#FFFFFF; padding: 6px; background-color:rgb(0, 98, 255);" onclick="kzBUT(\'' + pts + '\' )" id="' + pts + '" contenteditable="true">按钮</div>');
  $('#ptdiv').append($newp);
  $("#" + pts).draggable({ containment: '#ptdiv' });

}

function kzBUT(numa) {

  var ldh = document.getElementById("kj");
  var ldh1 = document.getElementById(numa);
  console.log(ldh.style.fontSize)
  ldh.innerHTML = `
  <br><div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">控件ID</label>
  <input type="text" value="`+ numa + `" class="form-control" id="con1" disabled >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">按钮颜色</label>
<input  type="color" value="`+ rgbToHex(ldh1.style.backgroundColor) + `" class="form-control" onchange="textset1('` + numa + `');" id="conb2" >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">按钮文本颜色</label>
<input  type="color" value="`+ rgbToHex(ldh1.style.color) + `" class="form-control" onchange="textset1('` + numa + `');" id="conb4" >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">按钮大小</label>
<input  type="text" value="`+ ldh1.style.padding + `" class="form-control" onchange="textset1('` + numa + `');" id="conb3" >
</div>
    `
}
function textset1(numa) {
  var ldh1 = document.getElementById(numa);
  ldh1.style.backgroundColor = document.getElementById("conb2").value;
  ldh1.style.padding = document.getElementById("conb3").value;
  ldh1.style.color = document.getElementById("conb4").value;
}

//开关
function new_con_switch() {
  pts = randomString(30, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  var $newp = $('<label class="rapid-ui-switch" style="" id="' + pts + '" onclick="kzSWI(\'' + pts + '\' )"> <input type="checkbox"> <span class="rapid-ui-switch-slider"></span> </label>');
  $('#ptdiv').append($newp);
  $("#" + pts).draggable({ containment: '#ptdiv' });

}

function kzSWI(numa) {
  var ldh = document.getElementById("kj");
  var ldh1 = document.getElementById(numa);
  ldh.innerHTML = `
  <br>
  <br><div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">控件ID</label>
  <input type="text" value="`+ numa + `" class="form-control" id="con1" disabled >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">开关开启颜色</label>
<input  type="color" value="`+ rgbToHex(ldh1.style.backgroundColor) + `" class="form-control" onchange="textset1('` + numa + `');" id="cona1" >
</div>
<br><div class="mb-3">
<label for="exampleFormControlInput1" class="form-label">开关大小</label>
<input  type="text" value="`+ ldh1.style.padding + `" class="form-control" onchange="textset1('` + numa + `');" id="cona4" >
</div>

    `
  
}