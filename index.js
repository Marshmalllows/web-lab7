const text = document.getElementById("text");
const textCopy = text.innerHTML;
const work = document.getElementById("work");

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
    quad2.style.backgroundImage = "url('quad2.png')"
    quad3.style.backgroundImage = "url('quad3.png')"
    quad4.style.backgroundImage = "url('quad4.png')"
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
}

function StartAnimation(){
    const animButton = document.getElementById("startAnimButton");
    animButton.disabled = true;

}