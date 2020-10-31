let pilot;

function createPilot() {
	pilot = {
		headAngle: 0 // we track this so we can lerp smoothly toward new rotation
	}
}

function drawPilot() {
	push();
	const pos = getTruePlanePos();

	//assumes we are already translated to the centre of the plane (with whatever rotation the plane fuselage has)

	const headX = 10;
	calcPilotHeadAngle(pos.x + headX, pos.z);
	translate(headX, -7, 0);
	push();
	rotateY(pilot.headAngle);
	fill(palette.yellow);
	box(10);

	//scarf wrap
	fill(palette.blue);
	box(11, 2, 11);

	//googles band wrap
	fill(palette.brown);
	push();
	translate(0, -2, 0)
	box(10.3, 0.8, 10.3);
	pop();

	push();
	translate(5, -2, 0);
	drawGoggles();
	pop();
	pop();
	drawScarf();
	pop();
}


function updatePilot() {}

function drawScarf() {
	fill(palette.blue);
	// box(11, 2, 11);
	for (let x = 0; x > -1; x -= 0.1) {
		push();
		amp = x;
		const y = amp * sin(x * TWO_PI + frameCount / 3);
		const z = amp * 0.8 * sin(PI / 3 + x * TWO_PI + frameCount / 3)
		translate(-4 + x * 20, -1 + y, z);
		box(2, 2, 5);
		pop();
	}
}

function drawGoggles() {
	fill(palette.brown);
	[-2, 2].forEach(zOff => {
		push();
		translate(0, 1.5, zOff);
		box(0.8, 5.5, 3);
		pop();
	});

}

function calcYAngleToCameraFrom(x, z) {
	const cameraPos = createVector(camera.eyeX, camera.eyeY, camera.eyeZ);
	const pilotToCamera = p5.Vector.sub(cameraPos, createVector(x, 0, z));
	//2d-ify: 
	trueAngle = createVector(pilotToCamera.x, pilotToCamera.z).heading();
	return -constrain(trueAngle, -PI / 2, PI / 2);
	// return sin(frameCount / 100);
}

function calcPilotHeadAngle(x, z) {
	let isCurious = frameCount % 700 < 100;
	isCurious = isCurious || mouseIsPressed;
	const angleCurious = calcYAngleToCameraFrom(x, z);
	const angleStraight = 0;
	const targetAngle = isCurious ? angleCurious : angleStraight;
	pilot.headAngle = lerp(pilot.headAngle, targetAngle, 0.1);
}