window.addEventListener("load", startGame)

//starting game 
var firstCircle;
function startGame(){
    myGame.board();
    firstCircle = new newCircle(20,myGame.canvas.height/2,15,0,2,"blue")
     nex(firstCircle)
}
var myGame = {
    canvas : document.getElementById("canvas"),
    context : this.canvas.getContext("2d"),
    
    board  :   ()=> {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight;
    },
    clear: () => {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    },
    newPosition:()=>{
        firstCircle.x +=550
    }
   
}

function newCircle(x,y,r, angleStart,endValue,color ){
    this.x = x;
    this.y = y;
    this.r = r;
    var c = Math.PI*endValue
   
        ctx = myGame.context
        ctx.beginPath()
        ctx.fillStyle =color
        ctx.arc(this.x, this.y, this.r, angleStart, c)
        ctx.fill()
    
    
}
function nex (firstCircle){
   firstCircle.x+=133333333
   console.log(firstCircle.x)
}


