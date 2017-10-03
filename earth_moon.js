const WHITE = 0xffffff;
const BLUE = 0x0000ff;
const GRAY = 0xa0a0a0;

class App {
    init() {
        const WIDTH = 1024;
        const HEIGHT = 600;

        const VIEW_ANGLE = 45;
        const ASPECT = WIDTH / HEIGHT;
        const NEAR = 0.1;
        const FAR = 10000;

        const container = document.querySelector("#stage");
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.camera.position.y = 10;
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);





        //make earth
        this.earth = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16), new THREE.MeshLambertMaterial({color: WHITE}));
        this.earth.position.z = -300;
        this.scene.add(this.earth);

        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg',(tex) => {
            this.earth.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        });

        // earth label
        this.earthLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 15),
            new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        );
        this.earthLabel.position.z = -300;
        this.earthLabel.position.y = 80;
        this.scene.add(this.earthLabel);

        // make moon
        const moon_material = new THREE.MeshLambertMaterial({color: GRAY});
        this.moon = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16), moon_material);
        this.moon.position.x = 100;
        this.moonGroup = new THREE.Group();
        this.moonGroup.position.z = -300;
        this.moonGroup.add(this.moon);
        this.scene.add(this.moonGroup);
        textureLoader.load('https://raw.githubusercontent.com/CoryG89/MoonDemo/master/img/maps/moon.jpg',(tex)=>{
            this.moon.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        })

        // make moon label
        this.moonLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 15),
            new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        );
        this.moonLabel.position.x = 100;
        this.moonLabel.position.y = 30;
        this.moonGroup.add(this.moonLabel);


        // make moon orbit path
        this.moonOrbit = new THREE.Mesh(
            new THREE.TorusGeometry(100, 1, 10, 50),
            new THREE.MeshBasicMaterial({color: WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        this.moonOrbit.rotation.x = Math.PI / 2;
        this.moonGroup.add(this.moonOrbit);

        //make lights
        const sunLight = new THREE.DirectionalLight(WHITE, 1.0);
        sunLight.position.x = -300;
        sunLight.position.y = 0;
        sunLight.position.z = -300;
        sunLight.target = this.earth;
        this.scene.add(sunLight);


        this.scene.add(new THREE.AmbientLight(WHITE, 0.4));

        this.renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(this.renderer.domElement);

        this.camera.lookAt(this.earth.position);
    }

    tick() {
        const rate = 0.005;
        this.moonGroup.rotation.y -= rate;
        this.earth.rotation.y -= rate;
        this.moonLabel.rotation.y += rate;
        this.renderer.render(this.scene, this.camera);
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