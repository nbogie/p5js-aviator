// A very quick attempt at implementing the same sort of world as described by Karim Maaloul:
// https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
// except with p5, not three.js

let camera;
let plane;
const clouds = [];
let waterParticles;
let smokeParticles;
let collectibles = [];

let settings = {
	shouldEmitSmokeParticles: false, //meh. not sure what I'm modelling here.
	planeCanMoveLeftRight: false,
	shouldDrawClouds: true ,
	shouldDrawOcean: true ,
	shouldDrawCollectibles: false	
};

const palette = {
	brown: "#774f38",
	orange: "#e08e79",
	yellow: "#f1d4af",
	cream: "#ece5ce",
	blue: "#c5e0dc",
	background: "#ece5ce"
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	createClouds();
	createPlane();
	createPilot();
	createCollectibles();
	waterParticles = [];
	smokeParticles = [];
	camera = createCamera();
	setCamera(camera);
	camera.setPosition(200, -400, 200);

	//Just to change near clipping distance:
	perspective(PI/3.0, width/height, 10, 6000);
}

function draw() {
	const ppos = getTruePlanePos();
	orbitControl(5, 5, 0.1);
	camera.lookAt(ppos.x, -300, 0);

	background(palette.background);
	translate(0, 0, 0);
	addLights();
	drawWaterParticles();
	drawSmokeParticles();
	settings.shouldDrawOcean && drawSea();
	settings.shouldDrawClouds && drawClouds();
	drawPlane();
	settings.shouldDrawCollectibles && drawCollectibles();
	updatePlane()
	updatePilot();
	updateWaterParticles();
	updateSmokeParticles();
	// noLoop();
}

function addLights() {
	directionalLight(color(120), createVector(0.3, 0.1, -0.4));

	//mix some white ambient light with a little pink light for warmth
	//white...
	ambientLight(165)
	//const mixFrac = map(sin(frameCount / 100), -1, 1, 0.1, 0.5);	
	//salmon
	const rgb = [220, 136, 116].map(v => v * 0.35)
	ambientLight(...rgb);
}

function drawSea() {
	push();
	rotateX(PI / 2);
	rotateY(-frameCount * 0.01);
	noStroke();
	fill(palette.blue)
	const seaSize = 250;
	cylinder(seaSize, seaSize);

	//draw sky - needs to be translucent
	fill(255, 0, 0, 10)
	// cylinder(seaSize * 2, seaSize * 2);
	pop();
}

function keyPressed() {
	const toggle = (key) => settings[key] = !settings[key];
	let toggleableKeyControls = {
		"c": "shouldDrawClouds",
		"s": "shouldEmitSmokeParticles",
		"m": "planeCanMoveLeftRight",
		"o": "shouldDrawOcean",
		"b": "shouldDrawCollectibles",
	}
	const settingKey = toggleableKeyControls[key];
	if (settingKey){
		toggle(settingKey);
	}
}