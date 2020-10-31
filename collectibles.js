function createCollectibles() {
	const numGroups = 6;
	for (let i = 0; i < numGroups; i++) {
		let basePhase = TWO_PI * (i+1)/numGroups;
		let baseHeight = random(0.7, 1.0);
		
		const numInGroup = 6;
		
		for (let j = 0; j < numInGroup; j++){
			let heightPhase =  PI  * j / numInGroup;
			let visible = true;
			let height = baseHeight;
			let phase = basePhase + j*PI/45;
			const c = {phase, height, heightPhase, visible};
			collectibles.push(c);
		}		
	}
}

function drawCollectibles(){
	collectibles.forEach(drawCollectible);
}

function drawCollectible(c){
	push();
	rotateZ(c.phase);
	const h = 350*c.height + map(cos(c.heightPhase + frameCount/10), -1, 1, -10, 1)
	translate(0,-h,0);
	fill(palette.blue)
  push();
	rotateX(c.heightPhase + frameCount/10);
	cone(10,10,4);
	pop();
	pop();
}