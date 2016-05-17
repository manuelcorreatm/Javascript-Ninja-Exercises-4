function dragStart(){
    event.dataTransfer.setData("text", event.target.id);
}

function drop() {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data)
    event.target.appendChild(draggedElement);
    if (event.target.id == "editor"){
        loadControls(draggedElement);

    }
    
}

function dragOver() {
    event.preventDefault();
}

function loadControls(draggedElement) {
    var draggedStyle = window.getComputedStyle(draggedElement);
    document.getElementById("borderColor").value = getStyleValue("rgb2hex", draggedStyle.getPropertyValue("border-color"));
    document.getElementById("borderThickness").value = getStyleValue("px2int", draggedStyle.getPropertyValue("border-width"));
    document.getElementById("backgroundColor").value = getStyleValue("rgb2hex", draggedStyle.getPropertyValue("background-color"));
    if (getStyleValue("px2int", draggedStyle.getPropertyValue("border-radius")) == "0") {
        document.getElementById("roundedNoRdo").checked = true;
    } else {
        document.getElementById("roundedYesRdo").checked = true;
    }
}

function updateDiv() {
    var editor = document.getElementById("editor");
    var styles
    for (var i = 0; i < editor.children.length; i++) {
        editor.children[i].style.borderColor = document.getElementById("borderColor").value;
        editor.children[i].style.borderWidth = document.getElementById("borderThickness").value + "px";
        editor.children[i].style.backgroundColor = document.getElementById("backgroundColor").value;
        if (document.getElementById("roundedYesRdo").checked == true) {
            editor.children[i].style.borderRadius = "50px";
        } else {
            editor.children[i].style.borderRadius = "0px";
        }
    }
}

function getStyleValue(type, from) {
    var types = {
        rgb2hex: rgb2hex,
        px2int: px2int,
    }

    return types[type](from);

}

function rgb2hex(rgb) {
    if (rgb.search("rgb") == -1) {
        return rgb;
    } else {
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
}

function px2int(pixels) {
    return pixels.match(/(\d+)/)[0];
}

(function () {
    var container = document.getElementById("container");
    var editor = document.getElementById("editor");
    var controls = document.getElementById("controls");

    container.addEventListener("dragstart", dragStart, false);
    container.addEventListener("drop", drop, false);
    container.addEventListener("dragover", dragOver, false);

    editor.addEventListener("dragstart", dragStart, false);
    editor.addEventListener("drop", drop, false);
    editor.addEventListener("dragover", dragOver, false);

    controls.addEventListener("change", updateDiv, false);
})();