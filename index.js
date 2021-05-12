window.addEventListener("load", startGame)

//starting game 
const totalObstacles =[];
var firstCircle;
var myScoress = 0
var backgroundImg;
var mySound;
var myMusic;
function startGame(){
    myGame.board();
    firstCircle = new circle(80,myGame.canvas.height/2,15,0,2,"blue")
    myScores =new circle(180,50,15,0,2,"RED", "text")
    backgroundImg =new circle(0,0,900,myGame.canvas.height,0,"background.jpeg", "image")
    newSound = new sound("sound.mp3")
    // music
    myMusic = new sound("music.mp3")
    
    //adding obstacles
    updateArea()
    multipleObstacles()
    
   
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
    var x = myGame.canvas.width;
    const  color="red";
    
    

//width, color,height,x,y
     
    setInterval(()=>{
    var minHeight = 100;
    var   maxHeight = 300;
    var  minGap = 50;
    var maxGap = 150;
    var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    let  height = Math.floor(Math.random()*(maxHeight-minHeight + 1)+ minHeight);
    totalObstacles.push(new obstacles(10,"green", x - height - gap , x, height+gap),
  
    )
    
    },1000);
     
    setInterval(()=>{
        var minHeight = 80;
        var   maxHeight = 200;
         var  minGap = 50;
          var maxGap = 100;
          var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        let  height = Math.floor(Math.random()*(maxHeight-minHeight + 1)+ minHeight);
    totalObstacles.push(new obstacles(width, color,height-gap,x, 0)
    
    )}
    
    ,3000);

   
}



// touch screen
function touchScreen(e){
    myGame.x = e.touches[0].screenX;
    myGame.x = e.touches[0].screenY;

}


function circle  (x,y,r, angleStart,endValue,color,type){
    this.x = x;
        this.y = y;
        this.r = r;
        this.speedX= 0
        this.speedY= 0
        this.speed = 2
        this.totalHeight = this.y -this.r
        this.totalWidth = this.x +this.r 
        var c = Math.PI*endValue 
        this.type= type
        
       
    
        this.update = ()=>{
         ctx = myGame.context
        if (this.type=="text") {
            ctx.font = " 20px Georgia" ;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }else if(this.type== "image"){
            this.image = new Image();
            this.image.src= color;
            // ctx.style()
            ctx.drawImage(this.image,this.x , this.y, this.r+ this.r,myGame.canvas.height)
   
        }
        else{
          
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(this.x, this.y, this.r, angleStart, c)
            ctx.fill()
        }
        }
        this.newPos = () => {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.type == "image") {
                if (this.x == -(this.r)) {
                  this.x = 0;
                }
            }
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
function obstacles(width, color,height,x,y){
    this.width = width;
    this.color =color;
    this.speed =2;
    this.newSpeed =this.speed++
    this.x = x;
    this.y = y;
    this.height= height
   
   
    this.updateObstacles = ()=>{
        ctx = myGame.context
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    
    }

}


function sound (src){
  this.sound= document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.play=()=>{
      this.sound.play()
  }
  this.stop = ()=>{
      console.log("stop")
      this.sound.pause()
  }
  
}



const updateArea=()=>{
    myGame.clear()
    // background image
 backgroundImg.speedX = -1
 var animate= requestAnimationFrame(updateArea)
    backgroundImg.newPos()
    backgroundImg.update()
    myMusic.play()
    
    
    
    
    totalObstacles.forEach(obstacle =>{
        if(firstCircle.collide(obstacle)){
            myMusic.stop()
            cancelAnimationFrame(animate) 
            newSound.play()
            
        }
    })
    totalObstacles.map(obstacless =>{
    
        obstacless.x += -obstacless.speed
        if(myScoress> 3000){
            obstacless.x += -obstacless.newSpeed
           }
        else if(myScoress> 4000){
            
            newSpeed++
        obstacless.x+= -obstacless.newSpeed
        }
           obstacless.updateObstacles()  
    }
        )
        
        
        
        
        
       
        firstCircle.update()
        firstCircle.newPos()
        myScores.update()
        myScores.text ="SCORES: " + myScoress++
        
            
        
      
    

    
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





