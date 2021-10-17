//canvas setup


var path = window.location.pathname;
var page = path.split("/").pop();
console.log(  page );
let canvas = undefined;
if(page == "index.html"){
     canvas = document.getElementById("canvas1");
}else if(page =="about.html"){
    canvas = document.getElementById("canvas1About");
}else if(page =="contact.html"){
    canvas = document.getElementById("canvas1Contact");
}



const ctx = canvas.getContext("2d");    //context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let numberOfParticles =  100;
    
//get mouse pos
let mouse ={
    x:null,
    y:null
}
window.addEventListener('mousemove',
function(event){
    mouse.x=event.x;
    mouse.y=event.y;
   
});
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   
    init();     // ao invez de chamar o init ver se aumenta ou diminui e adicionar ou remover particulas.
    
});
setInterval(function(){
    mouse.x=undefined;
    mouse.y=undefined;

},300)



//create particle
class Particle{
    constructor(x,y,size,color,weight){
        this.x=x;
        this.y=y;
        this.size=size;
        this.color=color;
        this.weight=weight;

    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
    update(){
        this.size -=0.05;
        if(this.size < 0 ){
            this.x = (mouse.x + ((Math.random()*50)-10));
            this.y = (mouse.y + ((Math.random()*50)-10));
            this.size = ((Math.random()*3)+2);
            this.weight = (Math.random()*2)-0.5;
        }
            this.y +=this.weight;
            this.weight +=0.8;
        
      
    

        if(this.y >= canvas.height -this.size){
            this.weight *=-0.5; 
        }
    }

}




function init(){
    particleArray = [];

    for(let i=0 ; i <numberOfParticles; i++){
        
        let x = mouse.x;
        let y = mouse.y;
        let size =(Math.random()  * 5 ) + 2 ;
        let color = "black"
        let weight = 1;

        particleArray.push(new Particle(x,y,size,color,weight));
    
    }

}

function animate(){
   // console.log( particleArray[10].x +"  " + particleArray[10].y + " " + particleArray[10].size + " "+ particleArray[10].color + " "+ particleArray[10].weight );
   // console.log("canvas:" + canvas.height)
    
    ctx.clearRect(0,0 , canvas.width , canvas.height);
    for(let i=0 ; i <particleArray.length; i++){
        particleArray[i].update();
        //particleArray[i].draw(); 
    }
    connect()
    requestAnimationFrame(animate);
}


function connect(){
    let oppacityValue = 1 ;
        for(let a = 0 ; a <particleArray.length ; a++){
            for(let b = 1 ; b <particleArray.length ; b++){
                //  dist particulas as outras
                let distance = ((particleArray[a].x -particleArray[b].x ) * (particleArray[a].x - particleArray[b].x )  +
                 (particleArray[a].y -particleArray[b].y) * (particleArray[a].y -particleArray[b].y) )     
        
                if(distance  <( canvas.width/7 )* (canvas.height/7)){
    
                    oppacityValue = 1 - (distance/17639) ;
                    ctx.strokeStyle='rgba(0, 0, 0,'+oppacityValue/8+')';
                    ctx.lineWidth=1;
                    ctx.beginPath();
                    ctx.lineWidth=1;
                    ctx.moveTo(particleArray[a].x , particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                }
            }
    
        }
    
    }
    


init();
animate();
















