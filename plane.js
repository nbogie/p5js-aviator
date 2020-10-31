function getTruePlanePos() {
	return createVector(plane.pos.x, -250 - 100 * plane.pos.y, plane.pos.z)
}

function drawPlane() {

	push();
	fill(palette.orange)

	noStroke()
	const pos = getTruePlanePos();
	translate(pos.x, pos.y, pos.z);
	
	//roll plane
	const rollAngle = 0.2 * sin(frameCount / 20);
	rotateX(rollAngle);

	
	push();
	//fuselage
	box(70, 13, 16)
	push()
	fill(palette.blue);
	translate(25, 0, 0);
	box(2, 10, 17);
	translate(3, 0, 0);
	box(2, 10, 17);
	pop();
	//propeller
	push();
	fill(palette.brown)

	const propThickness = 2;
	translate(38, 0, 0);
	push();
	translate(-2, 0, 0);
	rotateZ(PI/2)
	cylinder(2, 2);
	pop();

	rotateX(frameCount / 4);
	box(propThickness, 28, 5)
	box(propThickness, 5, 28)
	pop();

	//wings
	push();
	translate(12, 0, 0);

	push();
	//upper wing
	translate(0, -16, 0);
	box(20, 4, 80)
	pop();
	push()
	//lower wing
	translate(0, 3, 0);
	box(20, 4, 80)
	pop();
	pop();


	//tailwing
	translate(-30, 0, 0);
	box(20, 5, 40)
	//tail fin
	translate(0, -10, 0)
	box(15, 20, 5)
	pop();
	
	drawPilot();
	pop()

}

function createPlane() {
	plane = {
		pos: createVector(0, 0.5, 0),
	}
}


function updatePlane() {
	if (settings.planeCanMoveLeftRight) {
		plane.pos.z = map(mouseX, width * 0.2, width * 0.8, -50, 50, true);
	}
	// plane.pos.y = map(Math.sin(frameCount / 40), -1, 1, 0, 1);
	plane.pos.y = map(mouseY, 0, height, 1, 0, true);
	if (plane.pos.y < 0.1) {
		emitWaterParticle(getTruePlanePos());
	}
	if (settings.shouldEmitSmokeParticles) {
		emitSmokeParticle(getTruePlanePos());
	}

}