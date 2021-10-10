var canvas = document.getElementById("canvasBackground");

var ctx = canvas.getContext("2d"),
    width = document.width
    height = document.height
    let a, b;
    

    const setUpCanvas = () => {     
        // Feed the size back to the canvas.
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    
     
    };
    
//Drawing part - Notice the function here is only called upon "mousemove"
canvas.addEventListener("mousemove", function(e){
    console.log("Drawing.");
    a = a || e.clientX;
    b = b || e.clientY;
    var x = e.clientX,
        y = e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
    a = x;
    b = y;
})

//MAIN PART
function simulate(e) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("mousemove", true, true, window,
    0, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);
      canvas.dispatchEvent(evt);
    console.log("Emulated.");
}


window.addEventListener('mousemove',simulate);