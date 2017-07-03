"use strict";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

function generate(){
	let count = 10;
	let points = [];
	let edge;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the rectancle background
	ctx.fillStyle = "#f7f7f7";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Randomly draw the coordinates
	ctx.fillStyle = '#333';

	while (count) {
	    const posX = getRandomInt(80, canvas.width - 80);
	    const posY = getRandomInt(80, canvas.height - 80);

	    points.push({x:posX,y:posY});

		ctx.beginPath();
	    ctx.arc(posX, posY , 3, 0, 2*Math.PI);
	    ctx.fill();
	    count--;
	}

	edge = getFarthestPoints(points);

	// Draw a circle
	ctx.fillStyle = "#555555";
	const a = edge.x[1] - edge.x[0];
	const b = edge.y[1] - edge.y[0];
	const encircleX = (a / 2) + edge.x[0];
	const encircleY = (b / 2) + edge.y[0];
	const encircleR = Math.sqrt(a*a + b*b) / 2;

	ctx.beginPath();
	ctx.arc(encircleX,encircleY,encircleR,0,2*Math.PI);
	ctx.stroke();

	// Draw the area to cover
	ctx.fillStyle = "rgba(121, 183, 242, 0.2)";
	ctx.fillRect(Math.min.apply(Math, edge.x),Math.min.apply(Math, edge.y),a,b);

}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFarthestPoints(coords){
	let pointsX = [];
	let pointsY = [];
	let x = [];
	let y = [];
	let edge = []

	for (let i = 0; i < coords.length; i++){
		pointsX.push(coords[i].x);
		pointsY.push(coords[i].y);
	}

	y.push(Math.min.apply(Math, pointsY));
	y.push(Math.max.apply(Math, pointsY));

	x.push(Math.min.apply(Math, pointsX));
	x.push(Math.max.apply(Math, pointsX));

	return {'x': x, 'y': y};
}