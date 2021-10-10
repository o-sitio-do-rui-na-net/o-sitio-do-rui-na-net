
//create particle object
class Particle{
    constructor(x,y,directionX,directionY,size,color){
        
        this.x=x;
        this.y=y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.size=size;
        this.color=color;

    }
    //draw individual particle
    draw(){

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,
            Math.PI*2,false);
        ctx.fillStyle='#8c5523';
        ctx.fill();


    }
    //update particle each frame

    update(){

        if(this.x >canvas.width || this.x < 0 ){
            this.directionX = - this.directionX;
        }

        if(this.y > canvas.height || this.y<0){
            this.directionY = - this.directionY;
        }
        

        //distancias dos objetos ao rato
        let dx = mouse.x -this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx*dx + dy*dy);


        //check for collisions with mouse 
        if(distance < mouse.radius+this.size){

            if(mouse.x <this.x && this.x < canvas.width - this.size*10){
                this.x+=10;

            }if(mouse.x>this.x && this.x >this.size*10){
                     this.x-=10;
            }

            if(mouse.y < this.y && this.y <canvas.height -this.size*10 ){
                    this.y+=10;

            }
            if(mouse.y > this.y && this.y > this.size*10 ){
                    this.y -=10;

            }

        }

        this.x +=this.directionX;
        this.y +=this.directionY;

        this.draw();



    }

}






function drawMyName(){
    let fontfamily = 'Consolas';
    ctx.font = 'normal 7em Comic Sans MS,Arial,monospace';
    ctx.fillStyle='cornflowerblye';
    ctx.textAlign = 'center';
    ctx.textBaseline = "alphabetic";
    ctx.direction ="ltr";


    let text = "Rui Pedro";
    let metrics =  ctx.measureText(text);
    let w = metrics.width;

    ctx.fillText(text , innerWidth/2 , innerHeight/2);


}








const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");    //context
canvas.width = window.innerWidth
canvas.height = window.innerHeight







//globals
let particleColor1 = '#ffffff';
let particleColor2 = '#ffffff';


const setUpCanvas = () => {     
    // Feed the size back to the canvas.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

 
};

let particlesArray; 


//mouse costum object
let mouse ={
    x:null,
    y:null,
    radius:((canvas.height/100) * (canvas.width/100))

}



window.addEventListener('resize', () => {

    setUpCanvas(); // mete nova info no tamanho do canvas
    
    mouse.radius = ((canvas.height/100) * (canvas.width/100));


    init();     // ao invez de chamar o init ver se aumenta ou diminui e adicionar ou remover particulas.
    
});

window.addEventListener('mouseout',
function(){
    mouse.x=undefined;
    mouse.y=undefined;
}
);

window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;

});





 
function  animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0 , innerWidth , innerHeight);

    for(let i = 0 ; i <particlesArray.length ; i++){
        particlesArray[i].update();


    }
    connect();

}


function connect(){

let oppacityValue = 1 ;

    for(let a = 0 ; a <particlesArray.length ; a++){
        for(let b = 0 ; b <particlesArray.length ; b++){
            //  dist particulas as outras
            let distance = ((particlesArray[a].x -particlesArray[b].x ) * (particlesArray[a].x - particlesArray[b].x )  +
             (particlesArray[a].y -particlesArray[b].y) * (particlesArray[a].y -particlesArray[b].y) )      // elevado ?? 
    
            if(distance  <( canvas.width/7 )* (canvas.height/7)){

                oppacityValue = 1 - (distance/17639) ;
                ctx.strokeStyle='rgba(140,85,31,'+oppacityValue+')';
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x , particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

    }

    drawMyName();

}



function init(){
    
    particlesArray = [];
    
    let numberOfParticles = (canvas.height * canvas.width)  / 9000  ; //
    
    
    for(let i=0 ; i <numberOfParticles; i++){
        
    let size =(Math.random()  * 5 ) + 1 ;
    
    let x =  (Math.random() * ((innerWidth - size *2 ) - (size*2 )) + size*2 );
    let y =  (Math.random() * ((innerHeight - size *2 ) - (size*2 )) +  size*2 );
    
    let directionX = ( Math.random() * 5   ) - 2.5;
    let directionY = ( Math.random() * 5   ) - 2.5;
    
    let color = "#8c5523";
    
    particlesArray.push(new Particle(x,y,directionX, directionY , size, color));
    }
    
    }
    

init();

animate()
















