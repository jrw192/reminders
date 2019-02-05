function onClick() {
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	makeMain();
	makeAllMinor();
}

var button = document.getElementById("button");
button.addEventListener("click", onClick, false);

var canvas = document.getElementById("canvas");
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

var ctx = canvas.getContext("2d");


ctx.fillStyle = '#b5c2cf';

curPhrase = ""

phrases = [
	'吃饭了吗?',
	'穿多一点',
	'好好学习',
	'注意安全',
	'早点睡觉',
	'吃多一点',
	'回家了吗?',
	'注意身体',
	'别忘记了'
]

var width = window.innerWidth/2 - 250
var height = window.innerHeight/2
console.log(width, height)

function makeMain()
{
	ctx.font = "bold 100px SimHei"
	let newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	while(newPhrase === curPhrase)
		newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	curPhrase = newPhrase;
	ctx.shadowBlur = 10;
	ctx.shadowColor = "pink";
	if(curPhrase.length === 4)
		ctx.fillText(curPhrase, width, height);
	else if(curPhrase.length === 5)
		ctx.fillText(curPhrase, width-20, height);
}


makeMain();


var xVals = [];
var yVals = [];
var smols = [];

for(i=100; i<window.innerWidth-100;i+=50) {
	if(i < 300 || i > 650) 
		xVals.push(i);
		
}
for(i=100; i<window.innerHeight-100; i+=50) {
	if(i < 350 || i > 450) 
		yVals.push(i*0.9);
}

	// xVals.push(i);
	// yVals.push(i*0.9);


console.log(height)
console.log(xVals)

function makeAllMinor() {
	ctx.font = "15px KaiTi";
	ctx.shadowBlur = 0;
	let xTemp = xVals;
	let yTemp = yVals;
	for(i = 0; i < phrases.length; i++) {
		if(phrases[i] !== curPhrase) {
			let x = xTemp[Math.floor(Math.random() * xTemp.length)];
			let y = yTemp[Math.floor(Math.random() * yTemp.length)];
			// while ((x>300 || x<650) && (y>350 || y<430)) {
			// 	x = xTemp[Math.floor(Math.random() * xTemp.length)];
			// 	y = yTemp[Math.floor(Math.random() * yTemp.length)];
			// }
			ctx.fillText(phrases[i], x, y);
		}
	}
}

makeAllMinor();