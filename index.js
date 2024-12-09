const text = document.getElementById("text");
const textCopy = text.innerHTML;
const work = document.getElementById("work");
let widthCircle = 20;
let heightCircle = 20;
let leftPos = 11;
let topPos = 11;
let intervalId = 0;
let recordId = 1;
let recordsFromServer;
const recordsFromLocal = [];

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
    controls.style.display = "grid";
    controls.style.gridTemplateColumns = "1fr auto auto";
    controls.style.gridTemplateRows = "auto";
    controls.style.gridArea = "'info button button'";
    controls.innerHTML += "<p id='info'>Тут буде інформація</p>";
    const info = document.getElementById("info");
    info.style.fontSize = "12px";
    info.style.justifySelf = "start";
    controls.innerHTML += "<button id='startAnimButton' onclick='StartAnimation()'>Почати анімацію</button> ";
    controls.innerHTML += "<button id='closeButton' onclick='CloseClick()'>Закрити</button>";
}

async function CloseClick(){
    text.innerHTML = "";
    text.innerHTML = textCopy;
    text.style.padding = "1em";
    topPos = 11;
    leftPos = 11;
    widthCircle = 20;
    heightCircle = 20;
    clearInterval(intervalId);
    await fetch('https://web-api-7.onrender.com/api/get')
        .then(response => response.json())
        .then(records => {
            console.log(records);
            recordsFromServer = records;
        })
        .catch(error => console.error('Error loading objects:', error));
    for (let i = 0; i < recordsFromServer.length; i++) {
        recordsFromLocal.push(localStorage.getItem((i + 1).toString()));
    }
    localStorage.clear();

    recordId = 1;
    text.innerHTML += "<br>";
    const table = document.createElement("table");
    table.style.border = "1px solid black";
    table.style.width = "100%";
    table.style.fontSize = "12px";
    table.style.borderCollapse = "collapse";
    table.style.borderSpacing = "0";

    text.appendChild(table);

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["id", "Local", "Server"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.border = "1px solid black";
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < recordsFromServer.length; i++) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = recordsFromServer[i].id;
        idCell.style.border = "1px solid black";
        idCell.style.padding = "8px";
        row.appendChild(idCell);

        const localCell = document.createElement("td");
        localCell.textContent = recordsFromLocal[i] ? recordsFromLocal[i] : "No message";
        localCell.style.border = "1px solid black";
        localCell.style.padding = "8px";
        row.appendChild(localCell);

        const serverCell = document.createElement("td");
        serverCell.textContent = recordsFromServer[i].message;
        serverCell.style.border = "1px solid black";
        serverCell.style.padding = "8px";
        row.appendChild(serverCell);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}

let side = "";

async function StartAnimation(){
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
    let date = new Date();
    document.getElementById("info").textContent = date.toLocaleString() + " - Натиснуто кнопку початку анімації";
    const record = {
        id: recordId.toString(),
        message: " - Натиснуто кнопку початку анімації"
    };

    localStorage.setItem(record.id, date.toLocaleString() + record.message);
    await SaveRecord(record);
    intervalId = setInterval(UpdateCircle, 10);
}

async function UpdateCircle() {
    let date = new Date();
    const record = {
        id: recordId.toString(),
        message: ""
    };
    const circle = document.getElementById("circle");
    switch (side) {
        case "left":
            widthCircle++;
            circle.style.width = widthCircle + "px";
            leftPos++;
            circle.style.left = "calc(50% - " + leftPos + "px)";
            document.getElementById("info").textContent = date.toLocaleString() + " - Круг розширено ліворуч";
            record.message = " - Круг розширено ліворуч";
            localStorage.setItem(record.id, date.toLocaleString() + record.message);
            await SaveRecord(record);
            side = "top";
            break;
        case "top":
            heightCircle++;
            circle.style.height = heightCircle + "px";
            topPos++;
            circle.style.top = "calc(50% - " + topPos + "px)";
            document.getElementById("info").textContent = date.toLocaleString() + " - Круг розширено вгору";
            record.message = " - Круг розширено вгору";
            localStorage.setItem(record.id, date.toLocaleString() + record.message);
            await SaveRecord(record);
            side = "right";
            break;
        case "right":
            widthCircle++;
            circle.style.width = widthCircle + "px";
            document.getElementById("info").textContent = date.toLocaleString() + " - Круг розширено праворуч";
            record.message = " - Круг розширено праворуч";
            localStorage.setItem(record.id, date.toLocaleString() + record.message);
            await SaveRecord(record);
            side = "bottom";
            break;
        case "bottom":
            heightCircle++;
            circle.style.height = heightCircle + "px";
            document.getElementById("info").textContent = date.toLocaleString() + " - Круг розширено вниз";
            record.message = " - Круг розширено вниз";
            localStorage.setItem(record.id, date.toLocaleString() + record.message);
            await SaveRecord(record);
            side = "left";
            break;
    }

    if (widthCircle >= work.offsetWidth - 13 || heightCircle >= work.offsetHeight - 43) {
        clearInterval(intervalId);
        document.getElementById("info").textContent = date.toLocaleString() + " - Круг заповнив квадранти";
        record.message = " - Круг заповнив квадранти";
        record.id = recordId.toString();
        localStorage.setItem(record.id, date.toLocaleString() + record.message);
        await SaveRecord(record);
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

async function RestartClick(){
    const button = document.getElementById("restartAnimButton");
    let date = new Date();
    document.getElementById("info").textContent = date.toLocaleString() + " - Натиснуто кнопку перезапуску анімації";
    const record = {
        id: recordId.toString(),
        message: " - Натиснуто кнопку перезапуску анімації"
    };
    localStorage.setItem(record.id, date.toLocaleString() + record.message);
    await SaveRecord(record);
    button.id = "startAnimButton";
    button.innerText = "Почати анімацію";
    button.onclick = StartAnimation;
    const circle = document.getElementById("circle");
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.top = "calc(50% - 11px)";
    circle.style.left = "calc(50% - 11px)";
}

async function SaveRecord(message) {
    recordId++;
    fetch('https://web-api-7.onrender.com/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}