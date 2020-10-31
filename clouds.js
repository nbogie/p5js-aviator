

function createClouds() {
	for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 8) {
		for (let i = 0; i < 3; i++) {
			c = createCloud(angle);
			clouds.push(c);
		}
	}
}

function createCloud(baseAngle) {
	const spread = 0.4;
	return {
		height: random(0.8, 1),
		phase: baseAngle + random(-spread, spread) * PI,
		size: random(0.9, 1.1),
		z: random(-0.5, 0.5)
	}
}

function drawClouds() {
	for (let c of clouds) {
		push();
		//height above centre of world
		const r = c.height * 350;
		let x = r * cos(c.phase);
		let y = r * sin(c.phase);
		let z = c.z * 150;
		rotateZ(-frameCount / 200);
		translate(x, y, z);
		rotateZ(c.phase);
		fill(palette.cream)
		noStroke();
		const sz = c.size * 70;
		box(sz * 0.5, sz * 1, sz * 1);
		pop();
	}
}
