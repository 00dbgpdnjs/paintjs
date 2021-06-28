const canvas = document.getElementById("jsCanvas");
// context(ctx) deal with pixel
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// two codes below are to prevent that background's saved to a transparent color when you filled nothing  because background color of (real pixel)canvas wasn't set. Only background of HTML is set
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 
    CANVAS_SIZE, CANVAS_SIZE);
// stroke: draw the line
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// thick
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // event above : Give event of mousemove to this func
    // console.log(event); 
    //The func include offsetX and off setY
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);
    // path is location of mouse
    if (!painting) {
        // console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // console.log("creating line in ", x, y);
        // lineTo method : Connects the last point in the current sub-path
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    // console.log(event.target.style); // event > target > style > backgroundColor. This code shows css style of each clicked "color". It include backgroundColor.
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event) // check which do you want in this code.
    // console.log(event.target.value); // a value of the range
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    // coner pos and size of rect to fill(x, y, width, height)
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// (CM)ContextMenu : It's when right-clicked on canvas 
function handleCM(event) {
    // console.log(event);
    // Don't work CM
    event.preventDefault();
}

// The HTMLCanvasElement.toDataURL() method returns a data URL containing a representation of the image in the format. Shortly, get data of canvas like an image
function handleSaveClick() {
    const image = canvas.toDataURL(); // The defaulted type is png. You can set like this, ("image/jpeg") 
    // console.log(image);
    const link = document.createElement("a"); // Create link that doesn't exist
    link.href = image; // 우항: canvas.toDataURL()
    link.download = "PaintJS"; // 우항 has to be the name above
    // download is an attribute of the anchor tag / It instruct browsers to download a URL instead of navigating to it.
    // "navigating to it" : <a href=""> instead of <a download="">
    // console.log(link) // => <a download="data:image/jpeg;blablabla" download="PaintJS">
    link.click(); // Download the image
}

if (canvas) {
    // mousemove : built-in
    // when you move your mouse on canvas, execute the func
    canvas.addEventListener("mousemove", onMouseMove);
    // mousedown : This event occur when you click
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// from just collection to array form : Array.from( object )
// console.log(colors); // collection form
// console.log(Array.from(colors));
// "color" is each colors
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}