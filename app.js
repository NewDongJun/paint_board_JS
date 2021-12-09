const canvas = document.getElementById('JsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById('jsMode');
const saveBnt = document.getElementById("jsSave");

const windows = window.document

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE =  700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillStyle = 'green';
// ctx.fillRect(50, 50, 50, 50);


let painting = false;
let filling = false;
let mouseState = false;


function stopPainting(){
    painting = false
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x,y)
    }
    else{
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}

function onMouseDown(event){
    paniting = true;
}

function startPainting(){
    painting = true;
}

function handleColorClivk(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}


function handleRangechange(event){
    const width = event.target.value
    ctx.lineWidth = width
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = 'fill'
    }
    else{
        filling = true;
        mode.innerText = 'paint'
        
    }
}

function handleCanvasClick(){
    if (filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
}

function handleCM(event){
    event.preventDefault() //이게 우클릭 방지다!
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS❤️❤️❤️❤️";
    link.click();
}

function handleMouseEnter(event){
    if (mouseState){
        painting = true;
    }
    else{
        painting = false;
    }
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("mouseenter", handleMouseEnter);
}

function mouseDown(){
    mouseState = true;
}

function mouseUp(){
    mouseState = false;
}

if(windows){
    windows.addEventListener("mousedown", mouseDown);
    windows.addEventListener('mouseup', mouseUp);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClivk));

if(range){
    range.addEventListener("input", handleRangechange);
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBnt){
    saveBnt.addEventListener("click", handleSaveClick)
}