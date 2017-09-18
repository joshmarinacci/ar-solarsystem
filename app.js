

const WIDTH = 400;
const HEIGHT = 300;

const VIEW_ANGLE = 45;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const container = document.querySelector("#stage");
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
const scene = new THREE.Scene();

scene.add(camera);



function makeSun() {
    //red
    const material = new THREE.MeshLambertMaterial({
        color: 0xFFEE00
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(50,16,16),material);
    sphere.position.z = -300;
    scene.add(sphere);
    return sphere;
}

let earth = null;
function makeEarth() {
    const earthMaterial = new THREE.MeshLambertMaterial({
        color: 0x4499FF
    });
    const moonMaterial = new THREE.MeshLambertMaterial({
        color: 0xCCCCCC
    });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(5,16,16), moonMaterial);
    moon.position.x = 15;
    earth = new THREE.Mesh(new THREE.SphereGeometry(10,16,16),earthMaterial);
    earth.position.x = 100;
    earth.add(moon);

    const earthOrbit = new THREE.Group();
    earthOrbit.position.z = -300;
    earthOrbit.add(earth);
    scene.add(earthOrbit);
    return earthOrbit;
}


function makeLights() {
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    scene.add(pointLight);


    scene.add(new THREE.AmbientLight(0x505050));

}

const sun = makeSun();
const earthOrbit = makeEarth();
makeLights();


function updateAnimation() {
    // sun.position.x += 0.3;
    earthOrbit.rotation.y -= 0.01;
    earth.rotation.y -= 0.03;
    // earth.position.x += 1.0;
}


renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);

function update() {
    updateAnimation();
    renderer.render(scene,camera);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);