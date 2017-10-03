const WHITE = 0xffffff;
const BLUE = 0x0000ff;
const GRAY = 0xa0a0a0;
class App {
    init() {
        const WIDTH = 400;
        const HEIGHT = 300;

        const VIEW_ANGLE = 45;
        const ASPECT = WIDTH/HEIGHT;
        const NEAR = 0.1;
        const FAR = 10000;

        const container = document.querySelector("#stage");
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);


        //make earth
        const material = new THREE.MeshLambertMaterial({color: BLUE});
        this.earth = new THREE.Mesh(new THREE.SphereGeometry(50,16,16),material);
        this.earth.position.z = -300;
        this.scene.add(this.earth);


        //make moon
        const moon_material = new THREE.MeshLambertMaterial({color:GRAY});
        this.moon = new THREE.Mesh(new THREE.SphereGeometry(10,16,16),moon_material);
        this.moon.position.x  = 100;
        this.moonGroup = new THREE.Group();
        this.moonGroup.position.z = -300;
        this.moonGroup.add(this.moon);
        this.scene.add(this.moonGroup);

        //make lights
        const sunLight = new THREE.PointLight(WHITE,10);
        sunLight.position.x = 10;
        sunLight.position.y = 0;
        sunLight.position.z = 0;
        this.scene.add(sunLight);


        this.scene.add(new THREE.AmbientLight(WHITE,0.4));

        this.renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(this.renderer.domElement);
    }
    tick() {
        this.moonGroup.rotation.y -= 0.01;
        this.earth.rotation.y -= 0.01;
        this.renderer.render(this.scene,this.camera);
    }

    start() {
        const app = this;
        function tick() {
            requestAnimationFrame(tick);
            app.tick();
        }
        requestAnimationFrame(tick);
    }
}

const app = new App();
app.init();
app.start();