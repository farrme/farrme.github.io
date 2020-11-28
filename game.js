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
		new QA("What year did the Civil War start?", ["1861", "1838", "1775", "1793"], 0), 
		new QA("What year did the Civil War end?", ["1821", "1783", "1865", "1848"], 2), 
		new QA("In which state did the Civil War start?", ["Virginia", "North Carolina", "Philadelphia", "South Carolina"], 3), 
		new QA("What was the first battle of the Civil War?", ["Battle of Gettysburg", "First Battle of Bull Run", "Battle of Shiloh", "Battle of Antietam"], 1), 
		new QA("Who was the president of the Confederacy?", ["Jefferson Davis", "Abraham Lincoln", "Ulysses Grant", "Robert Lee"], 0), 
		new QA("Who was the president of the Union?", ["Jefferson Davis", "Abraham Lincoln", "Ulysses Grant", "Robert Lee"], 1), 
		new QA("How large was the Confederate army?", ["10 million", "5 million", "1 million", "500 thousand"], 2), 
		new QA("How large was the Union army?", ["10 million", "200 thousand", "4 million", "2 million"], 3), 
		new QA("How many years did the Civil War last?", ["4 years", "1 year", "10 years", "3 years"], 0), 
		new QA("What was the cause of the Civil War?", ["Resources", "Slavery", "Trade", "Money"], 1), 
		new QA("Where did the Civil War end?", ["South Carolina", "Pennsylvania", "Georgia", "Virginia"], 3), 
		new QA("Who was the Confederate army's commander at the end of the war?", ["Jefferson Davis", "Ulysses Grant", "Robert Lee", "Abraham Lincoln"], 2), 
		new QA("Who was the Union army's commander at the end of the war?", ["Abraham Lincoln", "Ulysses Grant", "Robert Lee", "Jefferson Davis"], 1), 
		new QA("When was the Gettysburg Address given?", ["April 12, 1861", "May 9, 1865", "April 19, 1775", "November 19, 1863"], 3), 
		new QA("What was the battle with the most casualties?", ["Battle of Shiloh", "Battle of Antietam", "Battle of Gettysburg", "Battle of Chickamauga"], 2), 
		new QA("Which general forced the Confederate army's commander to surrender?", ["Ulysses Grant", "Robert Lee", "Abraham Lincoln", "Jefferson Davis"], 0), 
		new QA("During the Civil War, who ran against Abraham Lincoln in his reelection?", ["Abraham Lincoln", "Andrew Johnson", "George McClellan", "George Washington"], 2), 
		new QA("How many major Civil War battles were in Texas?", ["3", "0", "2", "5"], 1), 
		new QA("How many major battles were in the Civil War?", ["378", "13", "22", "50"], 3), 
		new QA("How many Texans served in the Civil War?", ["90,000", "75,000", "225,000", "10,000"], 0)
];
shuffle(questions);
let totalQuestions=10;
let currQuestion=0;
let questionAns=-1;
let questionAnsTime=0;
let numRight=0;
let numWrong=0;
let prevBest=0;
function listenAnswerSelect(e){
	if(questionAns==-1){
		const numAnswers=questions[currQuestion].answerChoices.length;
		const sectionSize=canvas.width/numAnswers;
		const x=e.clientX-boundingRect.left;
		const y=e.clientY-boundingRect.top;
		if(y>=50 && y<=answersHeight+50){
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
}
function listenForRestart(e){
	const x=e.clientX-boundingRect.left;
	const y=e.clientY-boundingRect.top;
	if(x>=canvas.width/4 && y>=canvas.height/4 && x<=canvas.width*0.75 && y<=canvas.height*0.75){
		canvas.removeEventListener('mousedown', listenForRestart);
		restart();
	}
}
canvas.addEventListener('mousedown', listenAnswerSelect);
function restart(){
	shuffle(questions);
	currQuestion=0;
	questionAns=-1;
	if(prevBest<numRight/(numRight+numWrong)){
		prevBest=numRight/(numRight+numWrong);
	}
	numRight=0;
	numWrong=0;
	questionAnsTime=0;
	canvas.addEventListener('mousedown', listenAnswerSelect);
}
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
	if(questionAns!=-1 && Date.now()-questionAnsTime>=2000 && currQuestion<totalQuestions-1){
		questionAns=-1;
		currQuestion++;
		questionAnsTime=0;
		console.log(currQuestion);
	}
	if(currQuestion>=totalQuestions-1 && questionAnsTime!=0 && Date.now()-questionAnsTime>=2000){
		canvas.addEventListener('mousedown', listenForRestart);
		canvas.removeEventListener('mousedown', listenAnswerSelect);
		ctx.fillStyle='#8ff0ff';
		ctx.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
		ctx.strokeRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
		const textWidth1=ctx.measureText("Click to Restart").width;
		const textWidth2=ctx.measureText("Percent Correct: "+numRight/(numRight+numWrong)*100+"%").width;
		const textWidth3=ctx.measureText("Previous Best: "+prevBest*100+"%").width;
		const textHeight=ctx.measureText("M").width;
		ctx.fillStyle='black';
		ctx.fillText("Click to Restart", canvas.width/2-textWidth1/2, canvas.height/2-textHeight*2);
		ctx.fillText("Percent Correct: "+numRight/(numRight+numWrong)*100+"%", canvas.width/2-textWidth2/2, canvas.height/2-textHeight/2);
		ctx.fillText("Previous Best: "+prevBest*100+"%", canvas.width/2-textWidth3/2, canvas.height/2+textHeight);
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
