const text = document.getElementById("text");
const textCopy = text.innerHTML;
const work = document.getElementById("work");
let widthCircle = 20;
let heightCircle = 20;
let leftPos = 11;
let topPos = 11;
let intervalId = 0;

function StartClick(){
    text.style.padding = "0";
    text.innerHTML = "";
    work.innerHTML = "";
    work.innerHTML += "<div id='controls'></div><div id='anim'><div id='quad1'></div><div id='quad2'></div><div id='quad3'>" +
        "</div><div id='quad4'></div></div>";
    text.appendChild(work);
    const anim = document.getElementById("anim");
    const controls = document.getElementById("controls");
    const quad1 = document.getElementById("quad1");
    const quad2 = document.getElementById("quad2");
    const quad3 = document.getElementById("quad3");
    const quad4 = document.getElementById("quad4");
    work.style.display = "flex";
    work.style.flexDirection = "column";
    work.style.margin = "0";
    work.style.height = "100%";
    anim.style.flex = "1";
    anim.style.flexDirection = "column";
    anim.style.height = "calc(100% - 30px)";
    anim.style.minHeight = "600px";
    anim.style.border = "solid green 5px";
    anim.style.display = "grid";
    anim.style.gridTemplateAreas = '"quad1 quad2" "quad3 quad4"';
    anim.style.gridTemplateColumns = "1fr 1fr";
    anim.style.gridTemplateRows = "1fr 1fr";
    quad1.style.backgroundImage = "url('quad1.png')"
    quad1.style.gridArea = "quad1";
    quad2.style.backgroundImage = "url('quad2.png')"
    quad2.style.gridArea = "quad2";
    quad3.style.backgroundImage = "url('quad3.png')"
    quad3.style.gridArea = "quad3";
    quad4.style.backgroundImage = "url('quad4.png')"
    quad4.style.gridArea = "quad4";
    controls.style.maxHeight = "30px";
    controls.style.minHeight = "30px";
    controls.style.flex = "1";
    controls.style.justifyContent = "space-between";
    controls.innerHTML += "<button id='startAnimButton' onclick='StartAnimation()'>Почати анімацію</button> ";
    controls.innerHTML += "<button id='closeButton' onclick='CloseClick()'>Закрити</button>";
}

function CloseClick(){
    text.innerHTML = "";
    text.innerHTML = textCopy;
    text.style.padding = "1em";
    topPos = 11;
    leftPos = 11;
    widthCircle = 20;
    heightCircle = 20;
    clearInterval(intervalId);
}

let side = "";

function StartAnimation(){
    const animButton = document.getElementById("startAnimButton");
    animButton.disabled = true;
    const anim = document.getElementById("anim");
    anim.innerHTML += "<div id='circle'></div>";
    const circle = document.getElementById("circle");
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.borderRadius = "50%";
    circle.style.border = "solid green 2px";
    circle.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
    circle.style.position = "relative";
    circle.style.zIndex = "2";
    circle.style.gridColumn = "1 / 3";
    circle.style.gridRow = "1 / 3";
    circle.style.top = "calc(50% - 11px)";
    circle.style.left = "calc(50% - 11px)";
    side = "left";
    intervalId = setInterval(UpdateCircle, 10);
}

function UpdateCircle() {
    const circle = document.getElementById("circle");
    switch (side) {
        case "left":
            widthCircle++;
            circle.style.width = widthCircle + "px";
            leftPos++;
            circle.style.left = "calc(50% - " + leftPos + "px)";
            side = "top";
            break;
        case "top":
            heightCircle++;
            circle.style.height = heightCircle + "px";
            topPos++;
            circle.style.top = "calc(50% - " + topPos + "px)";
            side = "right";
            break;
        case "right":
            widthCircle++;
            circle.style.width = widthCircle + "px";
            side = "bottom";
            break;
        case "bottom":
            heightCircle++;
            circle.style.height = heightCircle + "px";
            side = "left";
            break;
    }
    if (widthCircle >= work.offsetWidth - 13 || heightCircle >= work.offsetHeight - 43) {
        clearInterval(intervalId);
        widthCircle = 20;
        heightCircle = 20;
        topPos = 11;
        leftPos = 11;
        const button = document.getElementById("startAnimButton");
        button.id = "restartAnimButton";
        button.innerText = "Перезапустити";
        button.disabled = false;
        button.onclick = RestartClick;
    }
}

function RestartClick(){
    const button = document.getElementById("restartAnimButton");
    button.id = "startAnimButton";
    button.innerText = "Почати анімацію";
    button.onclick = StartAnimation;
    const circle = document.getElementById("circle");
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.top = "calc(50% - 11px)";
    circle.style.left = "calc(50% - 11px)";
}