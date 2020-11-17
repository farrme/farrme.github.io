'use-strict';
class QA{
	constructor(question, answerChoices, correctAnswerIdx){
		this.question=question;
		this.answerChoices=answerChoices;
		this.correctAnswerIdx=correctAnswerIdx;
	}
}
let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');
const boundingRect=canvas.getBoundingClientRect();
canvas.width=window.innerWidth-50;
canvas.height=window.innerHeight-50;
const answersHeight=canvas.height/3;
let questions=[
		new QA("Hamburger or donut", ["Hamburger", "Donut"], 0), 
		new QA("Heefs?", ["yas", "yes."], 0), 
		new QA("Best way to kerdobnk", ["tastr", "kerdombetk"], 1), 
		new QA("mariah carey", ["all i want for christmas", "nooooooo"], 1), 
		new QA("turkey day", ["halloween", "christmas"], 1), 
		new QA("christ mas", ["yes", "no"], 1), 
		new QA("send help when", ["soon", "later"], 0), 
		new QA("take my hat", ["no thank", "gibus"], 1), 
		new QA("grammer communist", ["test", "dddd"], 1), 
		new QA("filler quastionm", ["yes", "efowhied"], 1), 
		new QA("im stuck in a question making factory", ["what?", "what?"], 0), 
		new QA("shreak when", ["tmoorrow", "hour"], 1)
];
shuffle(questions);
let currQuestion=0;
let questionAns=-1;
let questionAnsTime=0;
let numRight=0;
let numWrong=0;
function listenAnswerSelect(e){
	if(questionAns==-1){
		const numAnswers=questions[currQuestion].answerChoices.length;
		const sectionSize=canvas.width/numAnswers;
		const x=e.clientX-boundingRect.left;
		const y=e.clientY-boundingRect.top;
		if(y>=0 && y<=answersHeight){
			for(let i=0; i<numAnswers; i++){
				if(x>=i*sectionSize && x<(i+1)*sectionSize){
					questionAns=i;
					break;
				}
			}
		}
		if(questionAns!=-1){
			questionAnsTime=Date.now();
			if(questionAns==questions[currQuestion].correctAnswerIdx){
				numRight++;
			}else{
				numWrong++;
			}
		}
	}
	console.log(questionAns);
}
canvas.addEventListener('mousedown', listenAnswerSelect);
window.requestAnimationFrame(draw);
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const numAnswers=questions[currQuestion].answerChoices.length;
	const pixPerAnswer=canvas.width/numAnswers;
	ctx.font='30px sans-serif';
	for(let i=0; i<numAnswers; i++){
		const textWidth=ctx.measureText(questions[currQuestion].answerChoices[i]).width;
		if(questionAns==-1){
			ctx.fillStyle='#8ff0ff';
		}else if(questionAns==questions[currQuestion].correctAnswerIdx){
			ctx.fillStyle='#1ecb00';
		}else{
			ctx.fillStyle='#ff0000';
		}
		ctx.fillRect(i*pixPerAnswer, 50, pixPerAnswer, canvas.height/3);
		ctx.fillStyle='black';
		ctx.strokeRect(i*pixPerAnswer, 50, pixPerAnswer, canvas.height/3);
		ctx.fillText(questions[currQuestion].answerChoices[i], (i+0.5)*pixPerAnswer-textWidth/2, canvas.height/6+50);
	}
	const textWidth=ctx.measureText(questions[currQuestion].question).width;
	ctx.fillText(questions[currQuestion].question, canvas.width/2-textWidth/2, 35);
	if(questionAns!=-1 && Date.now()-questionAnsTime>=3000 && currQuestion<10){
		questionAns=-1;
		currQuestion++;
	}
 	window.requestAnimationFrame(draw);
}


function shuffle(a) {
	let j, x, i;
	for (i=a.length-1; i>0; i--) {
		j=Math.floor(Math.random()*(i+1));
		x=a[i];
		a[i]=a[j];
		a[j]=x;
	}
	return a;
}
