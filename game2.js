class Soldier{
	constructor(side){
		if(side==0){
			this.x=Math.floor(Math.random()*(canvas.width/2))
		}else{
			this.x=Math.floor(Math.random()*(canvas.width/2)+canvas.width/2)
		}
		this.y=Math.floor(Math.random()*canvas.height)
		this.directionsGoing=[false, false, false, false];
	}
}
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
canvas.width=window.innerWidth-50;
canvas.height=window.innerHeight-50;
let uSoldiers=[];
let cSoldiers=[];
for(let i=0; i<10; i++){
	uSoldiers[i]=new Soldier(0);
	console.log(uSoldiers[i].x+' '+uSoldiers[i].y);
	cSoldiers[i]=new Soldier(1);
	console.log(cSoldiers[i].x+' '+cSoldiers[i].y);
}
var team=-1;
const unionColor='rgb(0, 49, 83)';
context.fillStyle=unionColor;
context.fillRect(0, 0, canvas.width/2, canvas.height);
const confederacyColor='rgb(70, 70, 70)';
context.fillStyle=confederacyColor;
context.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height);
function getTeam(event){
	canvas.removeEventListener('mousedown', getTeam);
	const boundingRect=canvas.getBoundingClientRect()
	const x=event.clientX-boundingRect.left
	const y=event.clientY-boundingRect.top
	if(x>=0 && x<canvas.width/2 && y>=0 && y<=canvas.height){
		team=0;
	}else if(x>=canvas.width/2 && x<canvas.width && y>=0 && y<=canvas.height){
		team=1;
	}
	console.log(team);
}
canvas.addEventListener('mousedown', getTeam);
function keyDownEvent(event){
	console.log(event.key);
	if(team==0){
		switch(event.key){
			case "ArrowUp":
				uSoldiers[0].directionsGoing[0]=true;
				break;
			case "ArrowDown":
				uSoldiers[0].directionsGoing[1]=true;
				break;
			case "ArrowLeft":
				uSoldiers[0].directionsGoing[2]=true;
				break;
			case "ArrowRight":
				uSoldiers[0].directionsGoing[3]=true;
				break;
		}
	}else{
		switch(event.key){
			case "ArrowUp":
				cSoldiers[0].directionsGoing[0]=true;
				break;
			case "ArrowDown":
				cSoldiers[0].directionsGoing[1]=true;
				break;
			case "ArrowLeft":
				cSoldiers[0].directionsGoing[2]=true;
				break;
			case "ArrowRight":
				cSoldiers[0].directionsGoing[3]=true;
				break;
		}
	}
	console.log(uSoldiers[0].x+" "+uSoldiers[0].y);
}
function keyUpEvent(e){
	if(team==0){
		switch(event.key){
			case "ArrowUp":
				uSoldiers[0].directionsGoing[0]=false;
				break;
			case "ArrowDown":
				uSoldiers[0].directionsGoing[1]=false;
				break;
			case "ArrowLeft":
				uSoldiers[0].directionsGoing[2]=false;
				break;
			case "ArrowRight":
				uSoldiers[0].directionsGoing[3]=false;
				break;
		}
	}else{
		switch(event.key){
			case "ArrowUp":
				cSoldiers[0].directionsGoing[0]=false;
				break;
			case "ArrowDown":
				cSoldiers[0].directionsGoing[1]=false;
				break;
			case "ArrowLeft":
				cSoldiers[0].directionsGoing[2]=false;
				break;
			case "ArrowRight":
				cSoldiers[0].directionsGoing[3]=false;
				break;
		}
	}
}
document.onkeydown=keyDownEvent;
document.onkeyup=keyUpEvent;
window.requestAnimationFrame(draw);
setInterval(gameLoop, 20);
let lastLoopTime=Date.now();
function gameLoop(){
	const nowLoopTime=Date.now();
	const moveAmount=(nowLoopTime-lastLoopTime)/5;
	if(team==0){
		for(let i=0; i<uSoldiers.length; i++){
			if(i!=0 && Math.random()<=moveAmount/500){
				uSoldiers[i].directionsGoing=[false, false, false, false];
				let direction=Math.random();
				if(direction>=0.75){
					uSoldiers[i].directionsGoing[0]=true;
				}else if(direction>=0.5){
					uSoldiers[i].directionsGoing[1]=true;
				}else if(direction>=0.25){
					uSoldiers[i].directionsGoing[2]=true;
				}else{
					uSoldiers[i].directionsGoing[3]=true;
				}
			}
			if(uSoldiers[i].directionsGoing[0]){
				uSoldiers[i].y-=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[1]){
				uSoldiers[i].y+=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[2]){
				uSoldiers[i].x-=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[3]){
				uSoldiers[i].x+=moveAmount;
			}
			if(uSoldiers[i].x<0){
				uSoldiers[i].x=0;
			}
			if(uSoldiers[i].y<0){
				uSoldiers[i].y=canvas.height-uSoldiers[i].height;
			}
			if(uSoldiers[i].x>canvas.width-uSoldiers[i].width){
				uSoldiers[i].x=canvas.width-uSoldiers[i].width;
			}
			if(uSoldiers[i].y>canvas.height-uSoldiers[i].height){
				uSoldiers[i].y=0;
			}
		}
		for(let i=0; i<cSoldiers.length; i++){
			if(Math.random()<=moveAmount/500){
				cSoldiers[i].directionsGoing=[false, false, false, false];
				let direction=Math.random();
				if(direction>=0.75){
					cSoldiers[i].directionsGoing[0]=true;
				}else if(direction>=0.5){
					cSoldiers[i].directionsGoing[1]=true;
				}else if(direction>=0.25){
					cSoldiers[i].directionsGoing[2]=true;
				}else{
					cSoldiers[i].directionsGoing[3]=true;
				}
			}
			if(cSoldiers[i].directionsGoing[0]){
				cSoldiers[i].y-=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[1]){
				cSoldiers[i].y+=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[2]){
				cSoldiers[i].x-=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[3]){
				cSoldiers[i].x+=moveAmount;
			}
			if(cSoldiers[i].x<0){
				cSoldiers[i].x=0;
			}
			if(cSoldiers[i].y<0){
				cSoldiers[i].y=canvas.height-cSoldiers[i].height;
			}
			if(cSoldiers[i].x>canvas.width-cSoldiers[i].width){
				cSoldiers[i].x=canvas.width-cSoldiers[i].width;
			}
			if(cSoldiers[i].y>canvas.height-cSoldiers[i].height){
				cSoldiers[i].y=0;
			}
		}
	}else if(team==1){
		for(let i=0; i<uSoldiers.length; i++){
			if(Math.random()<=moveAmount/500){
				uSoldiers[i].directionsGoing=[false, false, false, false];
				let direction=Math.random();
				if(direction>=0.75){
					uSoldiers[i].directionsGoing[0]=true;
				}else if(direction>=0.5){
					uSoldiers[i].directionsGoing[1]=true;
				}else if(direction>=0.25){
					uSoldiers[i].directionsGoing[2]=true;
				}else{
					uSoldiers[i].directionsGoing[3]=true;
				}
			}
			if(uSoldiers[i].directionsGoing[0]){
				uSoldiers[i].y-=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[1]){
				uSoldiers[i].y+=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[2]){
				uSoldiers[i].x-=moveAmount;
			}
			if(uSoldiers[i].directionsGoing[3]){
				uSoldiers[i].x+=moveAmount;
			}
			if(uSoldiers[i].x<0){
				uSoldiers[i].x=0;
			}
			if(uSoldiers[i].y<0){
				uSoldiers[i].y=canvas.height-uSoldiers[i].height;
			}
			if(uSoldiers[i].x>canvas.width-uSoldiers[i].width){
				uSoldiers[i].x=canvas.width-uSoldiers[i].width;
			}
			if(uSoldiers[i].y>canvas.height-uSoldiers[i].height){
				uSoldiers[i].y=0;
			}
		}
		for(let i=0; i<cSoldiers.length; i++){
			if(i!=0 && Math.random()<=moveAmount/500){
				cSoldiers[i].directionsGoing=[false, false, false, false];
				let direction=Math.random();
				if(direction>=0.75){
					cSoldiers[i].directionsGoing[0]=true;
				}else if(direction>=0.5){
					cSoldiers[i].directionsGoing[1]=true;
				}else if(direction>=0.25){
					cSoldiers[i].directionsGoing[2]=true;
				}else{
					cSoldiers[i].directionsGoing[3]=true;
				}
			}
			if(cSoldiers[i].directionsGoing[0]){
				cSoldiers[i].y-=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[1]){
				cSoldiers[i].y+=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[2]){
				cSoldiers[i].x-=moveAmount;
			}
			if(cSoldiers[i].directionsGoing[3]){
				cSoldiers[i].x+=moveAmount;
			}
			if(cSoldiers[i].x<0){
				cSoldiers[i].x=0;
			}
			if(cSoldiers[i].y<0){
				cSoldiers[i].y=canvas.height-cSoldiers[i].height;
			}
			if(cSoldiers[i].x>canvas.width-cSoldiers[i].width){
				cSoldiers[i].x=canvas.width-cSoldiers[i].width;
			}
			if(cSoldiers[i].y>canvas.height-cSoldiers[i].height){
				cSoldiers[i].y=0;
			}
		}
	}
	lastLoopTime=nowLoopTime;
}
function draw(){
	if(team!=-1){
		context.clearRect(0, 0, canvas.width, canvas.height);
		for(let i=0; i<uSoldiers.length; i++){
			context.fillStyle=unionColor;
			context.fillRect(uSoldiers[i].x, uSoldiers[i].y, 20, 50);
		}
		for(let i=0; i<cSoldiers.length; i++){
			context.fillStyle=confederacyColor;
			context.fillRect(cSoldiers[i].x, cSoldiers[i].y, 20, 50);
		}
	}
	window.requestAnimationFrame(draw);
}
