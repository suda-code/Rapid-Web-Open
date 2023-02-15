function funDownload(content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};

function putoutit() {
    $("#ptdiv > *").attr('contenteditable', 'false')
    var ldh1 = document.getElementById("ptdiv").innerHTML
    funDownload(ldh1, "myproject.html");
    $("#ptdiv > *").attr('contenteditable', 'true')
}

function putoutcodeit() {
    var ldh1 = document.getElementById("ptdiv").innerHTML
    funDownload(ldh1, "myproject_code.rapidw");
}


function openFileDialog() {
    $("#filebutton").click();
}




function fileSelected() {
    const objFile = document.getElementById('filebutton')
    if (objFile.value === '') {
        alert('请选择文件！')
        return
    }
    const files = objFile.files
    const reader = new FileReader()
    reader.readAsText(files[0], "UTF-8")
    reader.onload = function (e) {
        const fileString = e.target.result
        document.getElementById("ptdiv").innerHTML = fileString
        $("#ptdiv > *").draggable({ containment: '#ptdiv' });
    }
}
