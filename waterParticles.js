function emitWaterParticle(pos) {
	waterParticles.push(createWaterParticle(pos));
	if (waterParticles.length > 100) {
		waterParticles.shift();
	}
}

function createWaterParticle(pos) {
	const vel = createVector(random(-0.8, -0.6), random(-0.2, -0.5), random(-0.1, 0.1));
	return {
		pos: pos.copy().add(random(-10, 15), 6, random(-10, 10)),
		vel: vel.normalize().setMag(random(1, 3)),
		size: random(0.2, 1),
		age: 0,
		color: random() < 0.9 ? palette.blue : 'white'//palette.cream
	}
}

function updateWaterParticles() {
	waterParticles.forEach(updateWaterParticle);
	waterParticles = waterParticles.filter(p => p.age < 300 && p.size > 0)
}

function updateWaterParticle(p) {
	p.pos.add(p.vel);
	p.age++;
	p.size -= 0.01;
	p.vel.add(createVector(0, 0.1, 0) );
}

function drawWaterParticles() {
	noStroke()
	for (let p of waterParticles) {
		fill(p.color);
		push();
		translate(p.pos.x, p.pos.y, p.pos.z)
		const sz = p.size * 10;
		box(sz, sz, sz);
		
		pop();
	}
}
