window.addEventListener("load", startGame)

//starting game 
const totalObstacles =[];
 var firstCircle
function startGame(){
    myGame.board();
    firstCircle = new circle(80,myGame.canvas.height/2,15,0,2,"blue")
    //adding obstacles
    multipleObstacles()
    updateArea()
    
   
}


// object
var myGame = {
    canvas : document.getElementById("canvas"),
    context : this.canvas.getContext("2d"),
    
    board  :  function (){
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight;
  // window.addEventListener("touchmove", ()=>touchScreen)
    },
    clear:  function()  {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    },


   
   
}

// adding multiple obstacles

function multipleObstacles(){
   const  width =10;
  
   const  color="red";
//    const  x=400;


     
    setInterval(()=>
    totalObstacles.push(new obstacles(width, color)
    
    )
    ,1000)

   
}



// touch screen
function touchScreen(e){
    myGame.x = e.touches[0].screenX;
    myGame.x = e.touches[0].screenY;

}


function circle  (x,y,r, angleStart,endValue,color){
    this.x = x;
        this.y = y;
        this.r = r;
        this.speedX= 0
        this.speedY= 0
        this.speed = 2
        this.totalHeight = this.y -this.r
        this.totalWidth = this.x +this.r 
        var c = Math.PI*endValue  
        this.update = ()=>{
            
            ctx = myGame.context
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(this.x, this.y, this.r, angleStart, c)
            ctx.fill()
        }
        this.newPos = () => {
            this.x += this.speedX
            this.y += this.speedY
        }
        this.collide = (otherobj)=>{
            var myleft = this.x;
            var myright = this.x + (this.r);
            var mytop = this.y;
            var mybottom = this.y + (this.r);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
             
                crash = false;
            }
            return crash;
        
        }

       
}
// obstacles
function obstacles(width, color,minGap,maxGap,minHeight,maxHeight ){
    this.width = width;
    this.color =color;
    this.speed =4
    this.y = 0;
    this.x = myGame.canvas.width;
    var  minHeight = myGame.canvas.height/4;
    var  maxHeight = myGame.canvas.height/1.2;
    this.height = Math.floor(Math.random()* (maxHeight-minHeight+1 )+ minHeight);
 
    this.gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
   
    this.updateObstacles =()=>{
        ctx = myGame.context
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    
    }

}






function updateArea(){
    myGame.clear()
    
    
    // if obstacle touches the player
    var animate= requestAnimationFrame(updateArea)
    
    totalObstacles.forEach(obstacle =>{
        if(firstCircle.collide(obstacle)){
           cancelAnimationFrame(animate) 
            
        }
    })
    for (let index = 0; index < totalObstacles.length; index++) {
       totalObstacles[index].x += -totalObstacles[index].speed
        totalObstacles[index].updateObstacles()   
        
    }
    
      
        
    
    
  
    firstCircle.update()
    firstCircle.newPos()
    
            
        
      
    

    
}






document.addEventListener("keydown",keyDown)
document.addEventListener("touchmove",keyDown)
document.addEventListener("touchmove",keyUp)
document.addEventListener("keyup",keyUp)



function keyDown (e){
    if(e.key== 2 || e.key === "ArrowUp"){
        moveUp()
    }
    if(e.key== 4 || e.key === "ArrowLeft"){
        moveLeft()
    }
    if(e.key== 8 || e.key === "ArrowDown"){
        moveDown()
    }
    if(e.key== 6 || e.key === "ArrowRight"){
        moveRight()
    }
}



 // to stop the moving of object
function keyUp(e){
    if(e.key== 2 || e.key === "ArrowUp"||
     e.key== 4 || e.key === "ArrowLeft"||
     e.key== 8 || e.key === "ArrowDown"||
     e.key== 6 || e.key === "ArrowRight"){
        firstCircle.speedY = 0
        firstCircle.speedX = 0
     }
    }
// directions

function moveUp(){
    myGame.clear()
    firstCircle.speedY = -firstCircle.speed
    
}
function moveDown(){
    myGame.clear()
    firstCircle.speedY = firstCircle.speed
    
}
function moveLeft(){
    myGame.clear()
    firstCircle.speedX= -firstCircle.speed
    
}
function moveRight(){
    myGame.clear()
    firstCircle.speedX= firstCircle.speed
    
}





