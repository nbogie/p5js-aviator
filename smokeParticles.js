function emitSmokeParticle(pos) {
	smokeParticles.push(createSmokeParticle(pos));
	if (smokeParticles.length > 100) {
		smokeParticles.shift();
	}
}



function createSmokeParticle(pos) {
	const vel = createVector(random(-10, -3), random(-0.1, 0.1), random(-0.1, 0.1));
	return {
		pos: pos.copy().add(-10, random(-12, 8), random(-40, 40)),
		vel: vel.normalize().setMag(random(2, 6)),
		size: random(0.2, 1),
		age: 0,
		color: palette.cream
	}
}

function updateSmokeParticles() {
	smokeParticles.forEach(updateSmokeParticle);
	smokeParticles = smokeParticles.filter(p => p.age < 300 && p.size > 0)
}

function updateSmokeParticle(p) {
	p.pos.add(p.vel);
	p.age++;
	p.size -= 0.01;
}

function drawSmokeParticles() {
	noStroke()
	for (let p of smokeParticles) {
		fill(p.color);
		push();
		rotateZ(p.pos.x / 300);
		translate(0, p.pos.y, 0);
		translate(0, 0, p.pos.z)
		const sz = p.size * 10;
		box(sz, sz, sz);

		pop();
	}
}